import AddCardButton from "components/AddCardButton/AddCardButton";
import AddCardForm from "components/AddCardForm/AddCardForm";
import DataMapping from "components/DataMapping/DataMapping";
import Modal from "components/Modal/Modal";
import useSubmiteAddDoor from "hooks/useSubmiteAddDoor";
import { useState } from "react";

const Fitting = () => {
  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { onSubmitAddDoor, setData, data, isLoadingAdd } =
    useSubmiteAddDoor<Item>({
      items: results,
      page: "entrance",
    });

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
    </>
  );
};

export default Fitting;
