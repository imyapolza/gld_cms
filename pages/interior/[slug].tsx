import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "styles/pages/interior/index.module.scss";
import { useEffect } from "react";
import clsx from "clsx";

interface IInterior {
  id: number;
  name: string;
  price: number;
  characteristics: string;
  picturePath: string;
}

interface Props {
  interior: IInterior;
}

const InteriorSlug = ({ interior }: Props): JSX.Element => {
  const router = useRouter();

  const characteristics: Array<{ name: string; value: string }> = JSON.parse(
    interior.characteristics
  );

  const isFirst = (index: number) => index === 0;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.name}>{interior.name}</h1>
      <div className={styles.main}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${interior.picturePath}`}
          alt="interior door image"
          width={340}
          height={450}
        />

        <ul>
          {characteristics &&
            characteristics.map(({ name, value }, index) => (
              <>
                <li
                  className={styles.item}
                  style={
                    isFirst(index)
                      ? { marginBottom: "30px", fontSize: "2em" }
                      : {}
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
                  <div className={styles.item_value}>
                    {isFirst(index) ? interior.price + " " + "руб." : value}
                  </div>
                </li>
              </>
            ))}
        </ul>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.slug;
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}interior/${id}`);

  const data = await resp.json();

  return {
    props: { interior: data },
  };
}

export default InteriorSlug;
