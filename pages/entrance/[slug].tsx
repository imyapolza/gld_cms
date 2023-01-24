import clsx from "clsx";
import Characteristics from "components/Characteristics/Characteristics";
import Layout from "components/Layout/Layout";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useState } from "react";
import onSubmitName from "requests/patch/onChangeName";
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

  const onBlurInput = (e: React.FocusEvent<HTMLElement>) => {
    onSubmit({ changeText: (e.target as HTMLInputElement).value });
  };

  return (
    <Layout>
    <div className={styles.wrapper}>
      {isChangeName ? (
        <input
          className={clsx(styles.name, styles.input)}
          type="text"
          autoFocus
          defaultValue={name ? name : entrance.name}
          onBlur={onBlurInput}
        />
      ) : (
        <h1 className={styles.name} onClick={onChangeName}>
          {name ? name : entrance.name}
        </h1>
      )}
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
    </Layout>
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
