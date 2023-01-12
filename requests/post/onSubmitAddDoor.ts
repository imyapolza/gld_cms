import { NextRouter } from "next/router";
import NProgress from "nprogress";
import toast from "react-hot-toast";

interface Arguments<T> {
  formData: FormData;
  page: string;
  setLoadingAdd: (arg: boolean) => void;
  router: NextRouter;
  setData: (data: Array<T>) => void;
}

const onSubmitAddDoor = async <T>({
  formData,
  page,
  setLoadingAdd,
  router,
  setData,
}: Arguments<T>) => {
  try {
    NProgress.start();
    setLoadingAdd(true);

    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${page}/file`, {
      method: "POST",
      body: formData,
    });

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

export default onSubmitAddDoor;
