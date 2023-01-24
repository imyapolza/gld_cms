import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  classNameLabel?: string;
  className?: string;
}

const Input = ({
  label,
  classNameLabel,
  className,
  ...rest
}: Props): JSX.Element => {
  return (
    <>
      <label className={clsx(styles.label, classNameLabel)}>
        {label}
        <input className={clsx(styles.input, className)} {...rest} />
      </label>
    </>
  );
};

export default Input;
