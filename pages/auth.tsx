import AuthForm from "components/AuthForm/AuthForm";
import Head from "next/head";
import React from "react";

const Auth = () => {
  return (
    <>
      <Head>
        <title>Аутентификация</title>
      </Head>
      <AuthForm />
    </>
  );
};

export default Auth;
