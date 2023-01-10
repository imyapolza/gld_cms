import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import styles from "styles/pages/slug.module.scss";
import Characteristics from "components/Characteristics/Characteristics";

interface Props {
  interior: Item;
}

const InteriorSlug = ({ interior }: Props): JSX.Element => {
  const characteristics: Array<Characteristic> = JSON.parse(
    interior.characteristics
  );

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
        <Characteristics<Array<Characteristic>>
          characteristics={characteristics}
          item={interior}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.slug;
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${ctx.resolvedUrl.split("/")[1]}/${id}`
  );

  const data = await resp.json();

  return {
    props: { interior: data },
  };
}

export default InteriorSlug;
