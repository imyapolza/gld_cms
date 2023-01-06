import clsx from "clsx";
import Button from "components/Button/Button";
import Card from "components/Card/Card";
import Modal from "components/Modal/Modal";
import { useRef, useState } from "react";
import styles from "styles/pages/interior.module.scss";

export const Interior = () => {
  const [isLoadingImage, setLoadingImage] = useState<boolean>(false);
  const [base64, setBase64] = useState<string>("");

  const [isFailedLoadSize, setFailedLoadSize] = useState<boolean>(false);
  const [isFailedLoadSmall, setFailedLoadSMall] = useState<boolean>(false);
  const [isFailedLoadType, setFailedLoadType] = useState<boolean>(false);

  const [dragActive, setDragActive] = useState<boolean>(false);

  const [characteristics, setCharacteristics] = useState<Array<number>>([]);

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

  function handleFile(files: FileList) {
    alert("Number of files: " + files.length);
  }

  // ref
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

  // handle drag events
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

  // triggers when file is dropped
  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      getBase64(e.dataTransfer.files[0]);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      getBase64(target.files[0]);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onAddCharacteristic = () => {
    setCharacteristics((prev) => [...prev, characteristics.length + 1]);
  };

  const onDeleteCharacteristic = () => {
    setCharacteristics((prev) => [
      ...prev.slice(0, characteristics.length - 1),
    ]);
  };

  return (
    <>
      <div className={styles.button_wrapper}>
        <a className={styles.modal_open} href="#openModal">
          Добавить межкомнатную дверь
        </a>
      </div>

      <Modal
        className={styles.modal}
        title="Добавление межкомнатной двери"
        height={"70vh"}
      >
        <form
          className={styles["form-file-upload"]}
          onDragEnter={handleDrag}
          onSubmit={(e) => console.log(e)}
        >
          <div>
            <label className={styles.label}>
              Название:
              <input
                className={styles.name_input}
                type="text"
                minLength={3}
                maxLength={100}
                placeholder="Название двери..."
              />
            </label>

            <label className={styles.label}>
              Характеристики:
              {characteristics.map((_, index) => (
                <div className={styles.characteristics}>
                  <input
                    className={styles.name_input}
                    type="text"
                    minLength={3}
                    maxLength={100}
                    placeholder={`Заголовок ${index + 1}...`}
                  />
                  <input
                    className={styles.name_input}
                    type="text"
                    minLength={3}
                    maxLength={100}
                    placeholder={`Характеристика ${index + 1}...`}
                  />
                </div>
              ))}
            </label>

            <div className={styles.characteristics_buttons}>
              {characteristics.length >= 1 && (
                <button
                  className={styles.characteristics_delete}
                  onClick={onDeleteCharacteristic}
                >
                  Удалить характеристику
                </button>
              )}

              <Button onClick={onAddCharacteristic}>
                Добавить характеристику
              </Button>
            </div>

            <label className={styles.label}>
              Фото двери:
              {/* <input
              className={styles.file_input}
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => {
                if (e.target.files) {
                  getBase64(e.target.files[0]);
                }
              }}
            /> */}
            </label>

            {base64 && (
              <button
                className={styles.button_delete}
                onClick={() => setBase64("")}
              >
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
                Не удалось загрузить. Изображение должно быть минимум 750
                пикселей в ширину и не менее 1000 пикселей в высоту!
              </div>
            )}

            {isFailedLoadType && (
              <div className={styles.failed}>
                Не удалось загрузить. Изображение должно быть формата png, jpg,
                jpeg
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
                >
                  <div
                    className={clsx(styles.block, {
                      [styles.block_dragover]: dragActive,
                    })}
                  >
                    <p className={styles["drag-drop-text"]}>
                      {dragActive
                        ? "Отпустите изображение"
                        : "Перетащите изображение сюда"}
                    </p>

                    <button
                      className={styles["upload-button"]}
                      onClick={onButtonClick}
                    >
                      Загрузить
                    </button>
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

            <Button className={styles.button} width={"100%"}>
              Сохранить
            </Button>
          </div>
        </form>
      </Modal>
      <div className={styles.wrapper}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default Interior;
