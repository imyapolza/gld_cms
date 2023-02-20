import NProgress from "nprogress";
import toast from "react-hot-toast";

interface Arguments {
  e: React.FocusEvent<HTMLElement>;
  item: Item;
  setNewPrice: (price: string) => void;
  setChangePrice: (arg: boolean) => void;
  page: string;
}

const onChangePrice = async ({
  e,
  item,
  setNewPrice,
  setChangePrice,
  page,
}: Arguments) => {
  const target = (e.target as HTMLInputElement).value;

  try {
    if (target) {
      NProgress.start();

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${page}/price/${item.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({
            price: target,
          }),
        }
      );

      const newData = await resp.json();

      if (resp.status >= 200) {
        setNewPrice(newData);
        toast.success("Цена изменена");
        setChangePrice(false);
        NProgress.done();
      }
    } else {
      setChangePrice(false);
      NProgress.done();
    }
  } catch (error) {
    console.log(error);
    toast.error("Не удалось изменить цену");
    setChangePrice(false);
  }
};

export default onChangePrice;
