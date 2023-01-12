import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import onChangePrice from "requests/patch/onChangePrice";
import styles from "./styles.module.scss";

interface Props<T> {
  characteristics: T;
  item: Item;
}

const Characteristics = <T,>({
  characteristics,
  item,
}: Props<T>): JSX.Element => {
  const [isChangePrice, setChangePrice] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<string | null>(null);

  const router = useRouter();

  const isFirst = (index: number) => index === 0;

  const onActivePrice = () => {
    setChangePrice(true);
  };

  return (
    <ul>
      {characteristics &&
        Array.isArray(characteristics) &&
        characteristics.map(({ name, value }, index) => (
          <li
            key={index}
            className={styles.item}
            style={
              isFirst(index) ? { marginBottom: "30px", fontSize: "2em" } : {}
            }
          >
            <div
              className={clsx(
                styles.item_title,
                index > 0 ? styles["w-200"] : styles.price_title
              )}
            >
              {isFirst(index) ? "" : name}
            </div>
            {isChangePrice && index === 0 ? (
              <>
                <input
                  autoFocus
                  className={styles.input}
                  type="text"
                  defaultValue={newPrice ? newPrice : item.price}
                  onBlur={(e) =>
                    onChangePrice({
                      e,
                      item,
                      setNewPrice,
                      setChangePrice,
                      page: router.asPath.split("/")[1],
                    })
                  }
                />
              </>
            ) : (
              <div onClick={onActivePrice}>
                {isFirst(index) ? (
                  <>
                    {newPrice
                      ? newPrice + " " + "руб."
                      : item.price + " " + "руб."}
                  </>
                ) : (
                  value
                )}
              </div>
            )}
          </li>
        ))}
    </ul>
  );
};

export default Characteristics;
