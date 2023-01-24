import clsx from "clsx";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
  title: string;
  height?: string;
  className?: string;
  isOpen?: boolean;
}

const Modal = ({
  children,
  title,
  height,
  className,
  isOpen,
}: Props): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      router.push({
        hash: "#openModal",
      });
    }
  }, [isOpen]);

  return (
    <div id="openModal" className={styles.modal}>
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-content"]}>
          <div className={styles["modal-header"]}>
            <h3 className={styles["modal-title"]}>{title}</h3>
            <a href="#close" title="Close" className={styles["close"]}>
              ×
            </a>
          </div>
          <div
            className={clsx(styles["modal-body"], className)}
            style={{ height }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Modal), {
  ssr: false,
});
