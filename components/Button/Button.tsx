import clsx from "clsx";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  width?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  children,
  width,
  className,
  onClick,
  type = "button",
  disabled,
}: Props): JSX.Element => {
  return (
    <button
      className={clsx(styles.button, className)}
      onClick={onClick}
      style={{ width }}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
