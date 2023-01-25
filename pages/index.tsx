import Layout from "layouts/Layout/Layout";
import { h2 } from "constants/Index";
import { useEffect, useState } from "react";
import onChangeAddress from "requests/patch/onChangeAddress";
import styles from "styles/pages/index.module.scss";

interface Props {
  home: Home;
}

function Home({ home }: Props): JSX.Element {
  const [isChangeAddress, setChangeAddress] = useState<boolean>(false);
  const [isAddress, setAddress] = useState<string | null>(null);

  const onChange = () => {
    setChangeAddress(true);
  };

  useEffect(() => {
    window.localStorage.setItem("number", JSON.stringify(home.number));
  }, [home.number]);

  return (
    <Layout>
      <div className={styles.wrapper}>
        <h2 className={styles.h2}>{h2}</h2>
        {isChangeAddress ? (
          <input
            autoFocus
            className={styles.input}
            type="text"
            defaultValue={isAddress ? isAddress : home.address}
            onBlur={(e) => onChangeAddress({ e, setAddress, setChangeAddress })}
          />
        ) : (
          <h3 className={styles.h3} onClick={onChange}>
            {isAddress ? isAddress : home.address}
          </h3>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}home`);

  const data = await resp.json();

  return {
    props: { home: data },
  };
}

export default Home;
