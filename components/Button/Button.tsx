import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const Button = ({ children, width, height }: Props): JSX.Element => {
  return (
    <button className={styles.button} style={{ width }}>
      {children}
    </button>
  );
};

export default Button;
