import styles from "./styles.module.scss";

interface Props {
  style?: React.CSSProperties;
}

const LoadingSpinner = ({ style }: Props): JSX.Element => {
  return (
    <div className={styles.wrapper} style={style}>
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
          stroke-width="6"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
