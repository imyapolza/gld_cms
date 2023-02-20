import DataMapping from 'components/DataMapping/DataMapping';
import Layout from 'layouts/Layout/Layout';
import useQueryParams from 'hooks/useQueryParams';

import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import styles from 'styles/pages/page.module.scss';
import Head from 'next/head';

interface Props {
  results: Array<Item>;
  total: number;
}

const Fitting = ({ results, total }: Props): JSX.Element => {
  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [items, setItems] = useState<Array<Item>>(results);

  const router = useRouter();

  const onPageChange = useQueryParams({
    router,
    setItems,
    pageName: 'fitting'
  });

  return (
    <Layout>
      <Head>
        <title>Фурнитура</title>
        <meta
          name='description'
          content='Купить фурнитуру в межозерном, галерея дверей'
        />
      </Head>

      <div className={styles.wrapper}>
        <DataMapping<Array<Item>> data={items} />
      </div>

      {total > 8 && (
        <ReactPaginate
          nextLabel='>'
          onPageChange={({ selected }) => onPageChange(selected)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={Math.ceil(total / 8)}
          previousLabel='<'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
        />
      )}
    </Layout>
  );
};

export async function getServerSideProps() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}fitting`);

  const { results, total } = await resp.json();

  return {
    props: { results, total }
  };
}

export default Fitting;
