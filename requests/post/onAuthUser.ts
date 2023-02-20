import { NextRouter } from "next/router";
import NProgress from "nprogress";
import toast from "react-hot-toast";

interface IBody {
  email: string;
  password: string;
}

interface Arguments {
  body: IBody;
  setError: (arg: boolean) => void;
  setLoading: (arg: boolean) => void;
  router: NextRouter;
}

const onAuthUser = async ({
  body,
  setError,
  setLoading,
  router,
}: Arguments) => {
  try {
    NProgress.start();

    setLoading(true);
    setError(false);

    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (resp.status === 401 || resp.status === 500 || resp.status === 400) {
      toast.error(`Не удалось войти, ${resp.statusText}`);
      NProgress.done();
      setError(true);
      setLoading(false);
      console.log("resp", resp);
      window.localStorage.setItem("isAuthorized", JSON.stringify(false));
    }

    if (
      resp.status >= 200 &&
      resp.status !== 401 &&
      resp.status !== 500 &&
      resp.status !== 400
    ) {
      window.location.hash = "";
      NProgress.done();
      setError(false);

      toast.success("Вход произведен");
      window.localStorage.setItem("isAuthorized", JSON.stringify(true));
      router.push("/");
    }
  } catch (error) {
    toast.error(`Не удалось войти`);
    setError(true);
    setLoading(false);
    NProgress.done();
    console.log(error);
    window.localStorage.setItem("isAuthorized", JSON.stringify(false));
  }
};

export default onAuthUser;
