import clsx from "clsx";
import styles from "./styles.module.scss";

interface Props<T> {
  characteristics: T;
  item: Item;
}

const Characteristics = <T,>({
  characteristics,
  item,
}: Props<T>): JSX.Element => {
  const isFirst = (index: number) => index === 0;

  return (
    <ul>
      {characteristics &&
        Array.isArray(characteristics) &&
        characteristics.map(({ name, value }, index) => (
          <>
            <li
              className={styles.item}
              style={
                isFirst(index) ? { marginBottom: "30px", fontSize: "2em" } : {}
              }
            >
              {index > 0 && (
                <div
                  className={clsx(
                    styles.item_title,
                    index > 0 ? styles["w-200"] : styles.price_title
                  )}
                >
                  {isFirst(index) ? "" : name}:
                </div>
              )}
              <div>{isFirst(index) ? item.price + " " + "руб." : value}</div>
            </li>
          </>
        ))}
    </ul>
  );
};

export default Characteristics;
