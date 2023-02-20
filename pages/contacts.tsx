import Layout from 'layouts/Layout/Layout';
import { RefObject, useEffect, useRef, useState } from 'react';
import styles from 'styles/pages/contacts.module.scss';
import { onPhoneMask } from 'utils/phoneMask';
import cartSrc from 'public/phone.png';
import Image from 'next/image';
import Head from 'next/head';

const Contacts = () => {
  const [isChangePhone, setChangePhone] = useState<boolean>(false);
  const [phone, setPhone] = useState<string | null>(null);

  const [phoneWithServer, setPhoneServer] = useState<string | null>(null);

  const input: RefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    const number = JSON.parse(window.localStorage.getItem('number') || '{}');

    if (number) {
      setPhoneServer(String(number));
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Контакты</title>
        <meta
          name='description'
          content='Галерея дверей контакты, связаться с галерея дверей'
        />
      </Head>
      <div className={styles.wrapper}>
        <h2 className={styles.number}>Номер телефона:</h2>
        <div className={styles.phone_wrapper}>
          <Image className={styles.phone_img} src={cartSrc} alt='cart' />
          {phoneWithServer}
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
