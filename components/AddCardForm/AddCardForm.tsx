import clsx from "clsx";
import Button from "components/Button/Button";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { useRef, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import styles from "./styles.module.scss";

interface Props {
  onSubmitAddDoor: (arg: FormData) => void;
  isLoadingAdd: boolean;
}

const AddCardForm = ({ onSubmitAddDoor, isLoadingAdd }: Props): JSX.Element => {
  const [isLoadingImage, setLoadingImage] = useState<boolean>(false);
  const [base64, setBase64] = useState<string>("");

  const [blob, setBlob] = useState<Blob | null>(null);

  const [isFailedLoadSize, setFailedLoadSize] = useState<boolean>(false);
  const [isFailedLoadSmall, setFailedLoadSMall] = useState<boolean>(false);
  const [isFailedLoadType, setFailedLoadType] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "characteristics",
  });

  const onSubmit = async ({ name, price, characteristics }: FieldValues) => {
    let formData = new FormData();

    if (blob) {
      formData.append("file", blob);
    }

    formData.append("name", name);
    formData.append("price", price);
    formData.append("characteristics", characteristics);

    onSubmitAddDoor(formData);
  };

  const [dragActive, setDragActive] = useState<boolean>(false);

  const types = ["image/png", "image/jpg", "image/jpeg"];

  function getBase64(file: Blob) {
    setFailedLoadSize(false);
    setFailedLoadSMall(false);
    setFailedLoadType(false);

    if (!types.includes(file.type)) {
      setFailedLoadType(true);
    } else {
      setFailedLoadSize(false);
      setFailedLoadSMall(false);
      setBase64("");

      if (Number((file.size / (1024 * 1024)).toFixed(2)) >= 1) {
        setFailedLoadSize(true);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setLoadingImage(true);
        reader.onload = function () {
          const image = new Image();
          if (typeof reader.result === "string") {
            image.src = reader.result;
          }

          image.onload = function () {
            const height = image.height;
            const width = image.width;
            if (width < 750 || height < 1000) {
              setFailedLoadSMall(true);
            } else {
              if (typeof reader.result === "string") {
                setBase64(reader.result);
                setBlob(file);
              }
            }
            return true;
          };

          setLoadingImage(false);
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      }
    }
  }

  const handleDrag = function (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      getBase64(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      getBase64(target.files[0]);
    }
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onAddCharacteristic = () => {
    append({ name: "", value: "" });
  };

  const onDeleteCharacteristic = (index: number) => {
    remove(index);
  };

  return (
    <form
      className={styles["form-file-upload"]}
      onDragEnter={handleDrag}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label className={styles.label}>
          Название:
          <input
            {...register("name", {
              required: true,
              maxLength: 30,
            })}
            className={styles.name_input}
            type="text"
            placeholder="Название двери..."
          />
          {errors.name && (
            <span className={styles.error}>
              Это поле обязательно к заполнению
            </span>
          )}
        </label>

        <label className={styles.label}>
          Цена:
          <input
            {...register("price", {
              required: true,
              maxLength: 6,
            })}
            className={styles.name_input}
            type="number"
            placeholder="Цена..."
          />
          {errors.price && (
            <span className={styles.error}>Максимум 6 цифр</span>
          )}
        </label>

        <label className={styles.label}>
          Характеристики:
          {fields.map((field, index) => {
            return (
              <>
                <div className={styles.characteristics} key={field.id}>
                  <input
                    key={field.id}
                    {...register(`characteristics.${index}.name`)}
                    className={styles.name_input}
                    type="text"
                    minLength={3}
                    maxLength={100}
                    placeholder={`Заголовок ${index + 1}...`}
                  />
                  <input
                    key={
                      field.id +
                      Date.now().toString(36) +
                      Math.random().toString(36).substring(2)
                    }
                    {...register(`characteristics.${index}.value`)}
                    className={styles.name_input}
                    type="text"
                    minLength={3}
                    maxLength={100}
                    placeholder={`Характеристика ${index + 1}...`}
                  />
                </div>
                <button
                  className={styles.characteristics_delete}
                  onClick={() => onDeleteCharacteristic(index)}
                >
                  Удалить характеристику
                </button>
              </>
            );
          })}
        </label>

        <div>
          <Button onClick={onAddCharacteristic}>Добавить характеристику</Button>
        </div>

        <label className={styles.label}>Фото двери:</label>

        {base64 && (
          <button className={styles.delete_img} onClick={() => setBase64("")}>
            Удалить изображение
          </button>
        )}

        {isFailedLoadSize && (
          <div className={styles.failed}>
            Не удалось загрузить. Слишком большой файл! (Больше 1 МБ)
          </div>
        )}
        {isFailedLoadSmall && (
          <div className={styles.failed}>
            Не удалось загрузить. Изображение должно быть минимум 750 пикселей в
            ширину и не менее 1000 пикселей в высоту!
          </div>
        )}

        {isFailedLoadType && (
          <div className={styles.failed}>
            Не удалось загрузить. Изображение должно быть формата png, jpg, jpeg
          </div>
        )}

        {isLoadingImage && (
          <div className={styles.loading}>Загрузка изображения...</div>
        )}

        {!base64 && (
          <>
            <input
              className={styles["input-file-upload"]}
              ref={inputRef}
              type="file"
              multiple={true}
              onChange={handleChange}
            />
            <label
              id={styles["label-file-upload"]}
              htmlFor="input-file-upload"
              className={dragActive ? "drag-active" : ""}
              onClick={onButtonClick}
            >
              <div
                className={clsx(styles.block, {
                  [styles.block_dragover]: dragActive,
                })}
              >
                <p className={styles["drag-drop-text"]}>
                  {dragActive ? (
                    "Отпустите изображение"
                  ) : (
                    <>
                      <>Перетащите изображение сюда</>
                      <br />
                      <br />
                      или
                      <br />
                      <br />
                      <>нажмите на этот блок для загрузки изображения</>
                    </>
                  )}
                </p>

                {errors.image && (
                  <span className={styles.error}>
                    Добавление изображения обязательно!
                  </span>
                )}
              </div>
            </label>
          </>
        )}

        {dragActive && (
          <div
            className={styles["drag-file-element"]}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
        <div className={styles.file_preview_wrapper}>
          {base64 && (
            <img
              className={styles.file_preview}
              src={base64}
              alt="preload image"
            />
          )}
        </div>

        {base64 && (
          <>
            {isLoadingAdd ? (
              <LoadingSpinner style={{ height: "100px" }} />
            ) : (
              <Button className={styles.button} width={"100%"} type="submit">
                Сохранить
              </Button>
            )}
          </>
        )}
      </div>
    </form>
  );
};

export default AddCardForm;
