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
import AddCardButton from "components/AddCardButton/AddCardButton";
import NoDataText from "components/NoDataText/NoDataText";
import useSubmiteAddDoor from "hooks/useSubmiteAddDoor";
import DataMapping from "components/DataMapping/DataMapping";

interface Props {
  interiors: Array<Interior>;
}

export const Interior = ({ interiors }: Props): JSX.Element => {
  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { onSubmitAddDoor, setData, data, isLoadingAdd } =
    useSubmiteAddDoor<Interior>({
      items: interiors,
    });

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
      <AddCardButton title="Добавить межкомнатную дверь" />

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
        <DataMapping<Array<Interior>>
          data={data}
          isLoadingDelete={isLoadingDelete}
          deleteId={deleteId}
          onDelete={onDelete}
        />
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
