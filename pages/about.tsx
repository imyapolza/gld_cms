import Layout from "layouts/Layout/Layout";
import Head from "next/head";

const About = () => {
  return (
    <Layout>
       <Head>
        <title>О нас</title>
        <meta
          name="description"
          content="Описание сайта галерея дверей"
        />
      </Head>
      <div>О нас</div>
    </Layout>
  );
};

export default About;
