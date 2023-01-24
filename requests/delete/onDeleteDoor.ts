import toast from "react-hot-toast";

interface Arguments<T> {
  id: number;
  setDeleteId: (id: number) => void;
  setLoadingDelete: (arg: boolean) => void;
  setData: (data: Array<T>) => void;
  page: string;
}

const onDeleteDoor = async <T>({
  id,
  setDeleteId,
  setLoadingDelete,
  setData,
  page,
}: Arguments<T>) => {
  try {
    setDeleteId(id);
    setLoadingDelete(true);

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${page}/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const newData = await resp.json();

    if (resp.status >= 200) {
      setData(newData);
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
