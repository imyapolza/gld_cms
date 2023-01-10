import AddCardButton from "components/AddCardButton/AddCardButton";
import AddCardForm from "components/AddCardForm/AddCardForm";
import Modal from "components/Modal/Modal";
import useSubmiteAddDoor from "hooks/useSubmiteAddDoor";
import styles from "styles/pages/entrance.module.scss";

interface Props {
  entrance: any;
}

const Entrance = ({ entrance }: Props): JSX.Element => {
  const { onSubmitAddDoor, setData, data, isLoadingAdd } =
    useSubmiteAddDoor<any>({
      items: entrance,
    });

  return (
    <>
      <AddCardButton title="Добавить входную дверь" />

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
