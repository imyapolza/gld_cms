import clsx from "clsx";
import Header from "components/Header/Header";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): JSX.Element {
  const router = useRouter();

  return (
    <>
      <div
        className={clsx(styles.wrapper, {
          [styles.right_background]: router.asPath === "/",
        })}
      >
        <div>
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
