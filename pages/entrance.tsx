import AddCardButton from "components/AddCardButton/AddCardButton";
import AddCardForm from "components/AddCardForm/AddCardForm";
import DataMapping from "components/DataMapping/DataMapping";
import Layout from "components/Layout/Layout";
import Modal from "components/Modal/Modal";
import useQueryParams from "hooks/useQueryParams";
import useSubmiteAddDoor from "hooks/useSubmiteAddDoor";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import onDeleteDoor from "requests/delete/onDeleteDoor";
import styles from "styles/pages/entrance.module.scss";

interface Props {
  results: Array<Item>;
  total: number;
}

const Entrance = ({ results, total }: Props): JSX.Element => {
  const [items, setItems] = useState<Array<Item>>(results);

  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const router = useRouter();

  const { onSubmitAddDoor, isLoadingAdd } = useSubmiteAddDoor<Item>({
    items: results,
    page: "entrance",
    setItems,
  });

  const onPageChange = useQueryParams({
    router,
    setItems,
    pageName: "entrance",
  });

  return (
    <>
      <Layout>
        <AddCardButton title="Добавить входную дверь" />

        <Modal
          className={styles.modal}
          title="Добавление входной двери"
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
                setItems,
                page: "entrance",
                router,
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
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}entrance`);

  const { results, total } = await resp.json();

  return {
    props: { results, total },
  };
}

export default Entrance;
