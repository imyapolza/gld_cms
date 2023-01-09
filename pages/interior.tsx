import AddCardForm from "components/AddCardForm/AddCardForm";
import Card from "components/Card/Card";
import Modal from "components/Modal/Modal";
import { useEffect, useState } from "react";
import NProgress from "nprogress";

import styles from "styles/pages/interior.module.scss";

interface Interior {
  characteristics: "[object Object]";
  id: number;
  name: string;
  picturePath: string;
  price: 1200;
}

interface Props {
  interiors: Array<Interior>;
}

export const Interior = ({ interiors }: Props): JSX.Element => {
  const [data, setData] = useState<Array<Interior>>(interiors);

  const onSubmitAddDoor = async (formData: FormData) => {
    NProgress.start();

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}interior/file`,
      {
        method: "POST",
        body: formData,
      }
    );

    const newData = await resp.json();

    if (resp.status >= 200) {
      window.location.hash = "";
      setData(newData);
      NProgress.done();
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
        <AddCardForm onSubmitAddDoor={onSubmitAddDoor} />
      </Modal>
      <div className={styles.wrapper}>
        {data &&
          data.map((item) => (
            <Card
              title={item.name}
              price={item.price}
              srcImage={`${process.env.NEXT_PUBLIC_API_URL}${item.picturePath}`}
            />
          ))}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}interior`);

  const data = await resp.json();

  return {
    props: { interiors: data },
  };
}

export default Interior;
