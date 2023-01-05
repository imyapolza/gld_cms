import type { AppProps } from "next/app";
import { Raleway } from "@next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

import "normalize.css";
import "styles/globals.scss";
import Layout from "components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={raleway.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
