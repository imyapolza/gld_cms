import AddCardForm from "components/AddCardForm/AddCardForm";
import Card from "components/Card/Card";
import Modal from "components/Modal/Modal";
import styles from "styles/pages/interior.module.scss";

export const Interior = () => {
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
        <AddCardForm />
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
