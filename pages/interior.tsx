import AddCardForm from "components/AddCardForm/AddCardForm";
import Modal from "components/Modal/Modal";
import { useState } from "react";
import AddCardButton from "components/AddCardButton/AddCardButton";
import useSubmiteAddDoor from "hooks/useSubmiteAddDoor";
import DataMapping from "components/DataMapping/DataMapping";
import styles from "styles/pages/interior.module.scss";
import onDeleteDoor from "requests/delete/onDeleteDoor";

interface Props {
  interiors: Array<Item>;
}

export const Interior = ({ interiors }: Props): JSX.Element => {
  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { onSubmitAddDoor, setData, data, isLoadingAdd } =
    useSubmiteAddDoor<Item>({
      items: interiors,
      page: "interior",
    });

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
        <DataMapping<Array<Item>>
          data={data}
          isLoadingDelete={isLoadingDelete}
          deleteId={deleteId}
          onDelete={(id: number) =>
            onDeleteDoor<Item>({
              id,
              setDeleteId,
              setLoadingDelete,
              setData,
              page: "interior",
            })
          }
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
