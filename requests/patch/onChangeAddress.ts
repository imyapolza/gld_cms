import NProgress from "nprogress";
import toast from "react-hot-toast";

interface Arguments {
  e: React.FocusEvent<HTMLElement>;
  setAddress: (address: string) => void;
  setChangeAddress: (flag: boolean) => void;
}

const onChangeAddress = async ({
  e,
  setAddress,
  setChangeAddress,
}: Arguments) => {
  const target = (e.target as HTMLInputElement).value;

  try {
    if (target.trim()) {
      NProgress.start();

      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}home`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
          address: target,
        }),
      });

      if (resp.status >= 200) {
        setAddress(target);
        setChangeAddress(false);
        toast.success("Подзаголовок изменен");
        NProgress.done();
      }
    } else {
      setChangeAddress(false);
      NProgress.done();
    }
  } catch (error) {
    console.log(error);
    setChangeAddress(false);
    toast.error("Не удалось изменить подзаголовок");
    NProgress.done();
  }
};

export default onChangeAddress;
