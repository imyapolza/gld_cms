import { menu, routerPaths, title } from "constants/Header";
import styles from "./styles.module.scss";
import DoorLogo from "components/DoorLogo/DoorLogo";
import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Burger from "components/Burger/Button/Button";
import Menu from "components/Burger/Menu/Menu";

const Header = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const menuId = "main-menu";

  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div>
        <Link className={styles.logo_block} href="/">
          <DoorLogo color={"#6E9C9F"} width={30} height={30} />
          <h1 className={styles.title}>{title}</h1>
        </Link>
      </div>

      <nav className={styles.list}>
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
      </nav>

      <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
      <Menu open={open} setOpen={setOpen} id={menuId} />
    </div>
  );
};

export default Header;
