import Layout from "layouts/Layout/Layout";
import { RefObject, useEffect, useRef, useState } from "react";
import onChangePhone from "requests/patch/onChangePhone";
import styles from "styles/pages/contacts.module.scss";
import { onPhoneMask } from "utils/phoneMask";
import cartSrc from "public/phone.png";
import Image from "next/image";
import Head from "next/head";

const Contacts = () => {
  const [isChangePhone, setChangePhone] = useState<boolean>(false);
  const [phone, setPhone] = useState<string | null>(null);

  const [phoneWithServer, setPhoneServer] = useState<string | null>(null);

  const onChangeNumber = () => {
    setChangePhone(true);
  };

  const input: RefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    const number = JSON.parse(window.localStorage.getItem("number") || "{}");

    if (number) {
      setPhoneServer(String(number));
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Контакты</title>
        <meta
          name="description"
          content="Галерея дверей контакты, связаться с галерея дверей"
        />
      </Head>
      <div className={styles.wrapper}>
        <h2 className={styles.number}>Номер телефона:</h2>
        <div className={styles.phone_wrapper}>
          {isChangePhone ? (
            <>
              {phoneWithServer && (
                <input
                  className={styles.input}
                  type="text"
                  onBlur={(e) => onChangePhone({ e, setChangePhone, setPhone })}
                  onInput={(e) => onPhoneMask({ e, input })}
                  ref={input}
                  defaultValue={phone ? phone : phoneWithServer}
                  autoFocus
                />
              )}
            </>
          ) : (
            <a className={styles.phone} onClick={onChangeNumber}>
              <Image className={styles.phone_img} src={cartSrc} alt="cart" />
              {phone ? phone : phoneWithServer}
            </a>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
