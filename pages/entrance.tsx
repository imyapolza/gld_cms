import AddCardButton from "components/AddCardButton/AddCardButton";
import AddCardForm from "components/AddCardForm/AddCardForm";
import DataMapping from "components/DataMapping/DataMapping";
import Layout from "components/Layout/Layout";
import Modal from "components/Modal/Modal";
import useSubmiteAddDoor from "hooks/useSubmiteAddDoor";
import { useState } from "react";
import onDeleteDoor from "requests/delete/onDeleteDoor";
import styles from "styles/pages/entrance.module.scss";

interface Props {
  results: Array<Item>;
  total: number;
}

const Entrance = ({ results }: Props): JSX.Element => {
  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { onSubmitAddDoor, setData, data, isLoadingAdd } =
    useSubmiteAddDoor<Item>({
      items: results,
      page: "entrance",
    });

  return (
    <>
      <Layout>
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
            onDelete={(id: number) =>
              onDeleteDoor<Item>({
                id,
                setDeleteId,
                setLoadingDelete,
                setData,
                page: "entrance",
              })
            }
          />
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}entrance`);

  const { results, total } = await resp.json();

  return {
    props: { results, total },
  };
}

export default Entrance;
