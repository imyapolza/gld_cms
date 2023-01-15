import clsx from "clsx";
import styles from "./styles.module.scss";

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

const LoadingSpinner = ({ style, className }: Props): JSX.Element => {
  return (
    <div className={clsx(styles.wrapper, className)} style={style}>
      <svg
        className={styles.spinner}
        width="50px"
        height="50px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.path}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
