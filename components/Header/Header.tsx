import Image from "next/image";
import phoneSrc from "public/phone.png";
import { menu, phone, routerPaths, title } from "constants/Header";
import styles from "./styles.module.scss";
import DoorLogo from "components/DoorLogo/DoorLogo";
import clsx from "clsx";
import { useRouter } from "next/router";
import ChangeTextArea from "components/ChangeTextarea/ChangeTextArea";
import { useState } from "react";
import Link from "next/link";

const Header = (): JSX.Element => {
  const router = useRouter();

  const [isChangePhone, setChangePhone] = useState<boolean>(false);

  const handleChangePhone = () => {
    setChangePhone(true);
  };

  const onCancelChangesPhone = () => {
    setChangePhone(false);
  };

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
                  routerPaths[index as keyof typeof routerPaths] ===
                  router.asPath,
              })}
              href={routerPaths[index as keyof typeof routerPaths]}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

      <ChangeTextArea
        isChange={isChangePhone}
        text={phone}
        stylesForm={styles.form}
        stylesDefault={styles.h2}
        handleChange={handleChangePhone}
        defaultType={"a"}
        onCancelChanges={onCancelChangesPhone}
        textAreaWidth={"inherit"}
        buttonClass={styles.button}
      />

      {/* <button className={styles.cart}>
        <Image src={cartSrc} alt="cart" />
      </button> */}
    </div>
  );
};

export default Header;
