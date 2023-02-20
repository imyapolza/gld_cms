import { NextRouter } from "next/router";
import NProgress from "nprogress";
import toast from "react-hot-toast";

interface Arguments<T> {
  formData: FormData;
  page: string;
  setLoadingAdd: (arg: boolean) => void;
  router: NextRouter;
  setItems: (data: Array<T>) => void;
}

const onSubmitAddDoor = async <T>({
  formData,
  page,
  setLoadingAdd,
  router,
  setItems,
}: Arguments<T>) => {
  try {
    NProgress.start();
    setLoadingAdd(true);

    const query = router.query;

    const offset = (Math.abs(Number(query.page)) - 1) * 8;

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${page}/file?page=${offset}&limit=${query.limit}`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    const newData = await resp.json();

    if (resp.status === 401) {
      toast.error(`Не удалось добавить, ${resp.statusText}`);
      setLoadingAdd(false);
      console.log("resp", resp);
    }

    if (resp.status >= 200 && resp.status !== 401) {
      window.location.hash = "";
      router.replace(router.asPath.replace("#", ""));

      setItems(newData.results);
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

export default onSubmitAddDoor;
