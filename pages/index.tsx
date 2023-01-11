import { h2 } from "constants/Index";
import { useState } from "react";
import styles from "styles/pages/index.module.scss";

export default function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.h2}>{h2}</h2>
        <h3 className={styles.h3}>
          Мы находимся по адресу: Межозерный, Ленина 53
        </h3>
      </div>
    </>
  );
}
