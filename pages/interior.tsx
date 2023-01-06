import Button from "components/Button/Button";
import Card from "components/Card/Card";
import Modal from "components/Modal/Modal";
import { useState } from "react";
import styles from "styles/pages/interior.module.scss";

export const Interior = () => {
  const [isLoadingImage, setLoadingImage] = useState<boolean>(false);
  const [base64, setBase64] = useState<string>("");
  const [isFailedLoadSize, setFailedLoadSize] = useState<boolean>(false);
  const [isFailedLoadSmall, setFailedLoadSMall] = useState<boolean>(false);

  function getBase64(file: Blob) {
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

  return (
    <>
      <div className={styles.button_wrapper}>
        <a className={styles.modal_open} href="#openModal">
          Добавить межкомнатную дверь
        </a>
      </div>

      <Modal title="Добавить межкомнатную дверь">
        <form>
          <label className={styles.label}>
            Название:
            <input className={styles.name_input} type="text" />
          </label>

          <label className={styles.label}>
            Фото двери:
            <input
              className={styles.file_input}
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => {
                if (e.target.files) {
                  getBase64(e.target.files[0]);
                }
              }}
            />
          </label>
        </form>
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
        <div className={styles.file_preview_wrapper}>
          {base64 && (
            <img
              className={styles.file_preview}
              src={base64}
              alt="preload image"
            />
          )}
        </div>
        {isLoadingImage && <span>Загрузка картинки...</span>}
        <Button width={"100%"}>Загрузить</Button>
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
