import clsx from "clsx";
import { doors } from "constants/Index";
import { useRouter } from "next/router";
import styles from "styles/pages/index.module.scss";
import { handlePage } from "utils/Index";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <h2 className={styles.h2}>
        Здесь вы можете ознакомиться с текущим ассортиментом дверей
      </h2>
      <h3 className={styles.h3}>
        Мы находимся по адресу: Межозерный, Ленина 53
      </h3>
      <div className={styles.doors}>
        {doors.map((door, index) => (
          <button
            key={index}
            className={clsx(styles.button, { [styles.iterior]: index === 1 })}
            onClick={() => handlePage(index, router)}
          >
            {door} двери
          </button>
        ))}
      </div>
    </>
  );
}
