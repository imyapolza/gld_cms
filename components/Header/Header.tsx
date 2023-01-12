import { menu, routerPaths, title } from "constants/Header";
import styles from "./styles.module.scss";
import DoorLogo from "components/DoorLogo/DoorLogo";
import clsx from "clsx";
import { useRouter } from "next/router";
import { RefObject, useEffect, useRef, useState } from "react";
import Link from "next/link";
import cartSrc from "public/phone.png";
import Image from "next/image";
import { onPhoneMask } from "utils/phoneMask";
import onChangePhone from "requests/patch/onChangePhone";

interface Props {
  home: Home;
}

const Header = ({ home }: Props): JSX.Element => {
  const router = useRouter();

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
    <div className={styles.wrapper}>
      <Link className={styles.logo_block} href="/">
        <DoorLogo color={"#6E9C9F"} width={30} height={30} />
        <h1 className={styles.title}>{title}</h1>
      </Link>

      <ul className={styles.list}>
        {menu.map((name, index) => (
          <li key={index} className={clsx(styles.list_item)}>
            <Link
              className={clsx(styles.list_link, {
                [styles.list_active]:
                  (router.asPath.includes(
                    routerPaths[index as keyof typeof routerPaths]
                  ) &&
                    index > 0) ||
                  (router.asPath === "/" && index === 0),
              })}
              href={routerPaths[index as keyof typeof routerPaths]}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

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
    </div>
  );
};

export default Header;
