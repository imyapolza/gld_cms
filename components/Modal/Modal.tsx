import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Modal = ({ children, title }: Props): JSX.Element => {
  return (
    <div id="openModal" className={styles.modal}>
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-content"]}>
          <div className={styles["modal-header"]}>
            <h3 className={styles["modal-title"]}>{title}</h3>
            <a href="#close" title="Close" className={styles["close"]}>
              ×
            </a>
          </div>
          <div className={styles["modal-body"]}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
