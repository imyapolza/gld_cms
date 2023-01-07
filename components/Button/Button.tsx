import clsx from "clsx";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  width?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  width,
  className,
  onClick,
  type = "button",
}: Props): JSX.Element => {
  return (
    <button
      className={clsx(styles.button, className)}
      onClick={onClick}
      style={{ width }}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
