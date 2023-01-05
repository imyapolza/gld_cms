import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import cardUrl from "public/card.png";
import overlaySrc from "public/card-overlay.png";

const Card = () => {
  return (
    <div className={styles.wrapper}>
      <Image className={styles.arrow} src={overlaySrc} alt="next arrow" />
      <Image
        src={cardUrl}
        alt="door"
        style={{ width: "100%", height: "100%" }}
      />
      <h3 className={styles.title}>Название двери</h3>
      <span className={styles.price}>3200 р</span>
    </div>
  );
};

export default Card;
