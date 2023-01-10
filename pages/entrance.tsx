import AddCardButton from "components/AddCardButton/AddCardButton";
import AddCardForm from "components/AddCardForm/AddCardForm";
import DataMapping from "components/DataMapping/DataMapping";
import Modal from "components/Modal/Modal";
import useSubmiteAddDoor from "hooks/useSubmiteAddDoor";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "styles/pages/entrance.module.scss";

interface Props {
  entrance: Array<Item>;
}

const Entrance = ({ entrance }: Props): JSX.Element => {
  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { onSubmitAddDoor, setData, data, isLoadingAdd } =
    useSubmiteAddDoor<Item>({
      items: entrance,
      page: "entrance",
    });

  const onDelete = async (id: number) => {
    try {
      setDeleteId(id);
      setLoadingDelete(true);

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}entrance/${id}`,
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
      <AddCardButton title="Добавить входную дверь" />

      <Modal
        className={styles.modal}
        title="Добавление входной двери"
        height={"70vh"}
      >
        <AddCardForm
          onSubmitAddDoor={onSubmitAddDoor}
          isLoadingAdd={isLoadingAdd}
        />
      </Modal>

      <div className={styles.wrapper}>
        <DataMapping<Array<Item>>
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
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}entrance`);

  const data = await resp.json();

  return {
    props: { entrance: data },
  };
}

export default Entrance;
