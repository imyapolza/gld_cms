import styles from "./styles.module.scss";

interface Props {
  title: string;
}

const AddCardButton = ({ title }: Props): JSX.Element => {
  return (
    <div className={styles.button_wrapper}>
      <a className={styles.modal_open} href="#openModal">
        {title}
      </a>
    </div>
  );
};

export default AddCardButton;
