import clsx from "clsx";
import styles from "./styles.module.scss";

interface Props {
  mt?: string;
  className?: string;
}

const LoadingDots = ({ mt, className }: Props): JSX.Element => {
  return (
    <div className={clsx(styles.load, className)} style={{ marginTop: mt }}>
      <div className={styles.one}></div>
      <div className={styles.two}></div>
      <div className={styles.three}></div>
    </div>
  );
};

export default LoadingDots;
