import clsx from "clsx";
import { menu, routerPaths } from "constants/Header";
import Link from "next/link";
import styles from "./styles.module.scss";

const Menu = ({ open, ...props }: any) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <nav className={clsx(styles.nav, { [styles.nav_active]: open })}>
      {menu.map((name, index) => (
        <Link
          key={index}
          href={routerPaths[index as keyof typeof routerPaths]}
          tabIndex={tabIndex}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
};

export default Menu;
