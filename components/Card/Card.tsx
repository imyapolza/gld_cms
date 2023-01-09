import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import cardUrl from "public/card.png";
import overlaySrc from "public/card-overlay.png";

interface Props {
  title: string;
  price: number;
  srcImage: string;
}

const Card = ({ title, price, srcImage }: Props): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Image className={styles.arrow} src={overlaySrc} alt="next arrow" />
      <Image src={srcImage} alt="door" width={240} height={320} />
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.price}>{price} р</span>
    </div>
  );
};

export default Card;
