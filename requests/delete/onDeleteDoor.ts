import { NextRouter } from "next/router";
import toast from "react-hot-toast";
import onChangePage from "requests/get/onChangePage";

interface Arguments<T> {
  id: number;
  setDeleteId: (id: number) => void;
  setLoadingDelete: (arg: boolean) => void;
  setItems: (data: Array<T>) => void;
  page: string;
  router: NextRouter;
}

const onDeleteDoor = async <T>({
  id,
  setDeleteId,
  setLoadingDelete,
  setItems,
  page,
  router,
}: Arguments<T>) => {
  try {
    setDeleteId(id);
    setLoadingDelete(true);

    const query = router.query;

    const offset = (Math.abs(Number(query.page)) - 1) * 8;

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${page}/${id}?page=${offset}&limit=${query.limit}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const newData = await resp.json();

    if (resp.status >= 200) {
      setItems(newData.results);
      setLoadingDelete(false);
      toast.success("Удалено!");
    }
  } catch (error) {
    setLoadingDelete(false);
    console.log(error);
    toast.error(`Не удалось удалить`);
  }
};

export default onDeleteDoor;
