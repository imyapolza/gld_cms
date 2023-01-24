import AddCardForm from "components/AddCardForm/AddCardForm";
import Modal from "components/Modal/Modal";
import { useState } from "react";
import AddCardButton from "components/AddCardButton/AddCardButton";
import useSubmiteAddDoor from "hooks/useSubmiteAddDoor";
import DataMapping from "components/DataMapping/DataMapping";
import styles from "styles/pages/interior.module.scss";
import onDeleteDoor from "requests/delete/onDeleteDoor";
import ReactPaginate from "react-paginate";
import onChangePage from "requests/get/onChangePage";
import Layout from "components/Layout/Layout";

interface Props {
  results: Array<Item>;
  total: number;
}

export const Interior = ({ results, total }: Props): JSX.Element => {
  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [items, setItems] = useState<Array<Item>>(results);

  const { onSubmitAddDoor, setData, data, isLoadingAdd } =
    useSubmiteAddDoor<Item>({
      items: results,
      page: "interior",
    });

  const onPageChange = async (page: number) => {
    const generatedOffset = page * 8;

    const { results } = await onChangePage({
      pageName: "interior",
      offset: generatedOffset,
      limit: 8,
    });

    setItems(results);
  };

  return (
    <>
    <Layout>
      <AddCardButton title="Добавить межкомнатную дверь" />

      <Modal
        className={styles.modal}
        title="Добавление межкомнатной двери"
        height={"70vh"}
      >
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
              setData,
              page: "interior",
            })
          }
        />
      </div>

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
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}interior`);

  const { results, total } = await resp.json();

  return {
    props: { results, total },
  };
}

export default Interior;
