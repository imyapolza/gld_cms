import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './styles.module.scss';

interface Props<T> {
  characteristics: T;
  item: Item;
}

const Characteristics = <T,>({
  characteristics,
  item
}: Props<T>): JSX.Element => {
  const [isChangePrice, setChangePrice] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<string | null>(null);

  const router = useRouter();

  const isFirst = (index: number) => index === 0;

  const onActivePrice = () => {
    setChangePrice(true);
  };

  return (
    <ul className={styles.ul}>
      {characteristics &&
        Array.isArray(characteristics) &&
        characteristics.map(({ name, value }, index) => (
          <li
            key={index}
            className={styles.item}
            style={
              isFirst(index) ? { marginBottom: '30px', fontSize: '2em' } : {}
            }
          >
            <div
              className={clsx(
                styles.item_title,
                index > 0 ? styles['w-200'] : styles.price_title
              )}
            >
              {isFirst(index) ? '' : name}
            </div>
            <div className={styles.price} onClick={onActivePrice}>
              {isFirst(index) ? (
                <>
                  {newPrice
                    ? newPrice + ' ' + 'руб.'
                    : item.price + ' ' + 'руб.'}
                </>
              ) : (
                value
              )}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Characteristics;
