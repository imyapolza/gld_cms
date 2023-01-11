import Characteristics from "components/Characteristics/Characteristics";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useState } from "react";
import onSubmitName from "requests/onSlugPatch";
import styles from "styles/pages/slug.module.scss";

interface Props {
  entrance: Item;
}

const EntranceSlug = ({ entrance }: Props): JSX.Element => {
  const [isChangeName, setChangeName] = useState<boolean>(false);
  const [isLoadingChange, setLoadingChange] = useState<boolean>(false);
  const [name, setName] = useState<string>(entrance.name);

  const characteristics: Array<Characteristic> = JSON.parse(
    entrance.characteristics
  );

  const onChangeName = () => {
    setChangeName(true);
  };

  const onCancelChangeName = () => {
    setChangeName(false);
  };

  const onSubmit = ({ changeText }: { changeText: string }) => {
    onSubmitName({
      changeText,
      setLoadingChange,
      onCancelChangeName,
      setName,
      id: entrance.id,
      page: "entrance",
    });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.name}>{name}</h1>
      <div className={styles.main}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${entrance.picturePath}`}
          alt="interior door image"
          width={340}
          height={450}
        />
        <Characteristics<Array<Characteristic>>
          characteristics={characteristics}
          item={entrance}
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
    props: { entrance: data },
  };
}

export default EntranceSlug;
