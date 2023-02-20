import Card from 'components/Card/Card';
import NoDataText from 'components/NoDataText/NoDataText';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

interface Props<T> {
  data: T;
}

const DataMapping = <T,>({ data }: Props<T>): JSX.Element => {
  const router = useRouter();

  return (
    <>
      {data &&
        data instanceof Array &&
        data.map((item, index) => (
          <div className={styles.interior_block} key={index}>
            <Link href={`${router.pathname}/${item.id}`}>
              <Card
                title={item.name}
                price={item.price}
                srcImage={`${process.env.NEXT_PUBLIC_API_URL}${item.picturePath}`}
              />
            </Link>
          </div>
        ))}

      {data && Array.isArray(data) && data.length === 0 && (
        <NoDataText title='Пока здесь нет товаров 😨' />
      )}
    </>
  );
};

export default DataMapping;
