import AddCardButton from "components/AddCardButton/AddCardButton";
import AddCardForm from "components/AddCardForm/AddCardForm";
import DataMapping from "components/DataMapping/DataMapping";
import Layout from "layouts/Layout/Layout";
import Modal from "components/Modal/Modal";
import useQueryParams from "hooks/useQueryParams";
import useSubmiteAddDoor from "hooks/useSubmiteAddDoor";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import onDeleteDoor from "requests/delete/onDeleteDoor";
import styles from "styles/pages/page.module.scss";
import Head from "next/head";

interface Props {
  results: Array<Item>;
  total: number;
}

export const Arch = ({ results, total }: Props): JSX.Element => {
  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [items, setItems] = useState<Array<Item>>(results);

  const router = useRouter();

  const { onSubmitAddDoor, isLoadingAdd } = useSubmiteAddDoor<Item>({
    items: results,
    page: "arch",
    setItems,
  });

  const onPageChange = useQueryParams({
    router,
    setItems,
    pageName: "arch",
  });

  return (
    <Layout>
       <Head>
        <title>Арки</title>
        <meta
          name="description"
          content="Купить арки в межозерном, галерея дверей"
        />
      </Head>
      <AddCardButton title="Добавить арку" />

      <Modal className={styles.modal} title="Добавление арки" height={"70vh"}>
        <AddCardForm
          onSubmitAddDoor={onSubmitAddDoor}
          isLoadingAdd={isLoadingAdd}
        />
      </Modal>

      <div className={styles.wrapper}>
        <DataMapping<Array<Item>>
          data={items}
          isLoadingDelete={isLoadingDelete}
          deleteId={deleteId}
          onDelete={(id: number) =>
            onDeleteDoor<Item>({
              id,
              setDeleteId,
              setLoadingDelete,
              setItems,
              page: "arch",
              router,
            })
          }
        />
      </div>

      {total > 8 && (
        <ReactPaginate
          nextLabel=">"
          onPageChange={({ selected }) => onPageChange(selected)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={Math.ceil(total / 8)}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      )}
    </Layout>
  );
};

export async function getServerSideProps() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}arch`);

  const { results, total } = await resp.json();

  return {
    props: { results, total },
  };
}

export default Arch;
