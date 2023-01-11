import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props<T> {
  items: Array<T>;
  page: string;
}

const useSubmiteAddDoor = <T>({ items, page }: Props<T>) => {
  const [data, setData] = useState<Array<T>>(items);
  const [isLoadingAdd, setLoadingAdd] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    console.log("router", router);
  }, []);

  const onSubmitAddDoor = async (formData: FormData) => {
    try {
      NProgress.start();
      setLoadingAdd(true);

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${page}/file`,
        {
          method: "POST",
          body: formData,
        }
      );

      const newData = await resp.json();

      if (resp.status >= 200) {
        window.location.hash = "";
        router.replace(router.asPath.replace("#", ""));

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
