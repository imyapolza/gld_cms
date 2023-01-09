import React from "react";
import type { AppProps } from "next/app";
import Layout from "components/Layout/Layout";
import { Router } from "next/router";

import { Raleway } from "@next/font/google";
import "normalize.css";
import "styles/globals.scss";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

const raleway = Raleway({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <main className={raleway.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
