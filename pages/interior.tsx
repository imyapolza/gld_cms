import AddCardForm from "components/AddCardForm/AddCardForm";
import Card from "components/Card/Card";
import Modal from "components/Modal/Modal";
import { useEffect, useState } from "react";
import NProgress from "nprogress";

import styles from "styles/pages/interior.module.scss";

export const Interior = ({ interiors }: any) => {
  const [data, setData] = useState<any>(interiors);

  const onRefetchInteriors = async () => {
    NProgress.set(0.4);
    const resp = await fetch(`http://localhost:8000/interior`).then((data) =>
      data.json()
    );

    NProgress.done();

    setData(resp);
  };

  const onSubmitAddDoor = async (formData: any) => {
    NProgress.start();
    try {
      let resp = await fetch("http://localhost:8000/interior/file", {
        method: "POST",
        body: formData,
      });

      if (resp.status >= 200 && resp) {
        window.location.hash = "";
        setTimeout(() => onRefetchInteriors(), 500);
      }
    } catch (error) {
      console.log(error);
    }
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
        <AddCardForm
          onRefetchInteriors={onRefetchInteriors}
          onSubmitAddDoor={onSubmitAddDoor}
        />
      </Modal>
      <div className={styles.wrapper}>
        {data &&
          data.map((item: any) => (
            <Card
              title={item.name}
              price={item.price}
              srcImage={`http://localhost:8000/${item.picturePath}`}
            />
          ))}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const resp = await fetch(`http://localhost:8000/interior`).then((data) =>
    data.json()
  );

  return {
    props: { interiors: resp },
  };
}

export default Interior;
