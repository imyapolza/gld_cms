import NProgress from "nprogress";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props<T> {
  items: Array<T>;
}

const useSubmiteAddDoor = <T>({ items }: Props<T>) => {
  const [data, setData] = useState<Array<T>>(items);
  const [isLoadingAdd, setLoadingAdd] = useState<boolean>(false);

  const onSubmitAddDoor = async (formData: FormData) => {
    try {
      NProgress.start();
      setLoadingAdd(true);

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}interior/file`,
        {
          method: "POST",
          body: formData,
        }
      );

      const newData = await resp.json();

      if (resp.status >= 200) {
        window.location.hash = "";
        setData(newData);
        NProgress.done();
        setLoadingAdd(false);
        toast.success("Добавлено!");
      }
    } catch (error) {
      toast.error(`Не удалось добавить`);
      setLoadingAdd(false);
      console.log(error);
    }
  };

  return { onSubmitAddDoor, data, isLoadingAdd, setData };
};

export default useSubmiteAddDoor;
