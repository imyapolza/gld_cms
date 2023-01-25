import Layout from "components/Layout/Layout";
import { RefObject, useEffect, useRef, useState } from "react";
import onChangePhone from "requests/patch/onChangePhone";
import styles from "styles/pages/contacts.module.scss";
import { onPhoneMask } from "utils/phoneMask";
import cartSrc from "public/phone.png";
import Image from "next/image";

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
            {phone ? phone : phoneWithServer}
            <Image className={styles.phone_img} src={cartSrc} alt="cart" />
          </a>
        )}
      </div>
    </Layout>
  );
};

export default Contacts;
