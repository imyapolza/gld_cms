import Layout from 'layouts/Layout/Layout';
import { h2 } from 'constants/Index';
import { useEffect } from 'react';
import styles from 'styles/pages/index.module.scss';
import Head from 'next/head';

interface Props {
  home: Home;
}

function Home({ home }: Props): JSX.Element {
  useEffect(() => {
    window.localStorage.setItem('number', JSON.stringify(home.number));
  }, [home.number]);

  return (
    <Layout>
      <Head>
        <title>Галерея дверей</title>
        <meta
          name='description'
          content='Купить двери в межозерном, галерея дверей'
        />
      </Head>
      <div className={styles.wrapper}>
        <h2 className={styles.h2}>{h2}</h2>
        <h3 className={styles.h3}>{home.address}</h3>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}home`);

  const data = await resp.json();

  return {
    props: { home: data }
  };
}

export default Home;
