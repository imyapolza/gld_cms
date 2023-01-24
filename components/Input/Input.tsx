import clsx from "clsx";
import React, { RefObject } from "react";
import { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  classNameLabel?: string;
  className?: string;
}

const Input = React.forwardRef(
  (
    { label, classNameLabel, className, ...rest }: Props,
    ref: any
  ): JSX.Element => {
    return (
      <>
        <label className={clsx(styles.label, classNameLabel)}>
          {label}
          <input
            className={clsx(styles.input, className)}
            {...rest}
            ref={ref}
          />
        </label>
      </>
    );
  }
);

export default Input;
