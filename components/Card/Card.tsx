import styles from "./styles.module.scss";
import Image from "next/image";
import overlaySrc from "public/card-overlay.png";

interface Props {
  title: string;
  price: number;
  srcImage: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Card = ({ title, price, srcImage, onClick }: Props): JSX.Element => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <Image className={styles.arrow} src={overlaySrc} alt="next arrow" />
      <Image
        style={{ objectFit: "cover" }}
        src={srcImage}
        alt="door"
        width={240}
        height={320}
      />
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.price}>{price} р</span>
    </div>
  );
};

export default Card;
