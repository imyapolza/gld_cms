import styles from "./styles.module.scss";

interface Props {
  mt?: string;
}

const LoadingDots = ({ mt }: Props): JSX.Element => {
  return (
    <div className={styles.load} style={{ marginTop: mt }}>
      <div className={styles.one}></div>
      <div className={styles.two}></div>
      <div className={styles.three}></div>
    </div>
  );
};

export default LoadingDots;
