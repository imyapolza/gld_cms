import clsx from "clsx";
import styles from "./styles.module.scss";

const Button = ({ open, setOpen, ...props }: any) => {
  const isExpanded = open ? true : false;

  return (
    <button
      className={styles.button}
      aria-label="Toggle menu"
      aria-expanded={isExpanded}
      open={open}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <span className={clsx({ [styles.active_1]: open })} />
      <span className={clsx({ [styles.active_2]: open })} />
      <span className={clsx({ [styles.active_3]: open })} />
    </button>
  );
};

export default Button;
