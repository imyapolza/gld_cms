import Card from "components/Card/Card";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import NoDataText from "components/NoDataText/NoDataText";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

interface Props<T> {
  data: T;
  isLoadingDelete: boolean;
  deleteId: number | null;
  onDelete: (arg: number) => void;
}

const DataMapping = <T,>({
  data,
  isLoadingDelete,
  deleteId,
  onDelete,
}: Props<T>): JSX.Element => {
  const router = useRouter();

  return (
    <>
      {data &&
        data instanceof Array &&
        data.map((item, index) => (
          <div className={styles.interior_block} key={index}>
            {isLoadingDelete ? (
              <>
                {deleteId === item.id && (
                  <LoadingSpinner className={styles.delete_spinner} />
                )}
              </>
            ) : (
              <>
                <button
                  className={styles.delete}
                  onClick={() => onDelete(item.id)}
                  disabled={isLoadingDelete}
                >
                  Удалить
                </button>
              </>
            )}

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
        <NoDataText title="Пока здесь нет товаров 😨" />
      )}
    </>
  );
};

export default DataMapping;
