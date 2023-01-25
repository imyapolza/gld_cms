import toast from "react-hot-toast";
import NProgress from "nprogress";

interface Arguments {
  e: React.FocusEvent<HTMLElement>;
  setChangePhone: (arg: boolean) => void;
  setPhone: (phone: string) => void;
}

const onChangePhone = async ({ e, setChangePhone, setPhone }: Arguments) => {
  try {
    const target = (e.target as HTMLInputElement).value;

    if (target.trim()) {
      NProgress.start();

      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}home`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
          number: target,
        }),
      });

      const { number } = await resp.json();

      if (resp.status >= 200) {
        setChangePhone(false);
        setPhone(number);
        toast.success("Номер телефона изменён");
        NProgress.done();
      }
    } else {
      setChangePhone(false);
    }
  } catch (error) {
    console.log(error);
    setChangePhone(false);
    NProgress.done();
    toast.success("Не удалось изменить номер телефона");
  }
};

export default onChangePhone;
