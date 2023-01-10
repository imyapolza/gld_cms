import AddCardForm from "components/AddCardForm/AddCardForm";
import Card from "components/Card/Card";
import Modal from "components/Modal/Modal";
import { useEffect, useState } from "react";
import NProgress from "nprogress";

import styles from "styles/pages/interior.module.scss";
import Link from "next/link";
import Button from "components/Button/Button";
import toast from "react-hot-toast";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

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

  const [isLoadingAdd, setLoadingAdd] = useState<boolean>(false);
  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const onSubmitAddDoor = async (formData: FormData) => {
    try {
      NProgress.start();
      setLoadingAdd(true);

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
        setLoadingAdd(false);
        toast.success("Добавлено!");
      }
    } catch (error) {
      toast.error(`Не удалось добавить`);
      setLoadingAdd(false);
      console.log(error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      setDeleteId(id);
      setLoadingDelete(true);

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}interior/${id}`,
        {
          method: "DELETE",
        }
      );

      const newData = await resp.json();

      if (resp.status >= 200) {
        setData(newData);
        setLoadingDelete(false);
        toast.success("Удалено!");
      }
    } catch (error) {
      toast.error(`Не удалось удалить`);
      setLoadingDelete(false);
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
          onSubmitAddDoor={onSubmitAddDoor}
          isLoadingAdd={isLoadingAdd}
        />
      </Modal>
      <div className={styles.wrapper}>
        {data &&
          data.map((item) => (
            <div className={styles.interior_block}>
              {isLoadingDelete ? (
                <>
                  {deleteId === item.id && (
                    <LoadingSpinner className={styles.delete_spinner} />
                  )}
                </>
              ) : (
                <>
                  <button
                    className={styles.delete}
                    onClick={() => onDelete(item.id)}
                    disabled={isLoadingDelete}
                  >
                    Удалить
                  </button>
                </>
              )}

              <Link href={`interior/${item.id}`}>
                <Card
                  title={item.name}
                  price={item.price}
                  srcImage={`${process.env.NEXT_PUBLIC_API_URL}${item.picturePath}`}
                />
              </Link>
            </div>
          ))}

        {data && data.length === 0 && (
          <div className={styles.default_wrapper}>
            <div className={styles.default}>Пока здесь нет дверей 😨</div>
          </div>
        )}
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
