import clsx from 'clsx';
import Characteristics from 'components/Characteristics/Characteristics';
import Layout from 'layouts/Layout/Layout';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import styles from 'styles/pages/slug.module.scss';

interface Props {
  entrance: Item;
}

const EntranceSlug = ({ entrance }: Props): JSX.Element => {
  const characteristics: Array<Characteristic> = JSON.parse(
    entrance.characteristics
  );

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.name_block}>
            <h1 className={styles.name}>{entrance.name}</h1>
            <Image
              className={styles.image}
              src={`${process.env.NEXT_PUBLIC_API_URL}${entrance.picturePath}`}
              alt='entrance door image'
              width={340}
              height={450}
            />
          </div>
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
    `${process.env.NEXT_PUBLIC_API_URL}${ctx.resolvedUrl.split('/')[1]}/${id}`
  );

  const data = await resp.json();

  return {
    props: { entrance: data }
  };
}

export default EntranceSlug;
