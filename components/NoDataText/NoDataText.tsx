import styles from "./styles.module.scss";

interface Props {
  title: string;
}

const NoDataText = ({ title }: Props): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.default}>{title}</div>
    </div>
  );
};

export default NoDataText;
