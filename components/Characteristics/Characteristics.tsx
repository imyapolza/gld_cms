import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
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

  const isFirst = (index: number) => index === 0;
  const router = useRouter();

  const onChangePrice = async (e: any) => {
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${
          router.asPath.split("/")[1]
        }/price/${item.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify({ price: e.target.value }),
        }
      );

      const newData = await resp.json();

      if (resp.status >= 200) {
        setNewPrice(newData);
        toast.success("Цена изменена");
        setChangePrice(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Не удалось изменить цену");
    }
  };

  const onActivePrice = () => {
    setChangePrice(true);
  };

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
                    onBlur={onChangePrice}
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
          </>
        ))}
    </ul>
  );
};

export default Characteristics;
