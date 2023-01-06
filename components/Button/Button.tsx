import clsx from "clsx";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  width?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button = ({
  children,
  width,
  className,
  onClick,
}: Props): JSX.Element => {
  return (
    <button
      className={clsx(styles.button, className)}
      onClick={onClick}
      style={{ width }}
    >
      {children}
    </button>
  );
};

export default Button;
