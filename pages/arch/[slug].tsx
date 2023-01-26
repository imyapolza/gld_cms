import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import styles from "styles/pages/slug.module.scss";
import Characteristics from "components/Characteristics/Characteristics";
import { useState } from "react";
import onSubmitName from "requests/patch/onChangeName";
import clsx from "clsx";
import Layout from "layouts/Layout/Layout";

interface Props {
  arch: Item;
}

const ArchSlug = ({ arch }: Props): JSX.Element => {
  const [isChangeName, setChangeName] = useState<boolean>(false);
  const [isLoadingChange, setLoadingChange] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);

  const characteristics: Array<Characteristic> = JSON.parse(
    arch.characteristics
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
      id: arch.id,
      page: "arch",
    });
  };

  const onBlurInput = (e: React.FocusEvent<HTMLElement>) => {
    const target = (e.target as HTMLInputElement).value;

    if (target.trim()) {
      onSubmit({ changeText: target });
    } else {
      setChangeName(false);
    }
  };

  return (
    <Layout>
      <div className={styles.wrapper}>
        {isChangeName ? (
          <input
            className={clsx(styles.name, styles.input)}
            type="text"
            autoFocus
            defaultValue={name ? name : arch.name}
            onBlur={onBlurInput}
          />
        ) : (
          <h1 className={styles.name} onClick={onChangeName}>
            {name ? name : arch.name}
          </h1>
        )}
        <div className={styles.main}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${arch.picturePath}`}
            alt="arch door image"
            width={340}
            height={450}
          />
          <Characteristics<Array<Characteristic>>
            characteristics={characteristics}
            item={arch}
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
    props: { arch: data },
  };
}

export default ArchSlug;