import toast from "react-hot-toast";
import NProgress from "nprogress";

interface Arguments {
  changeText: string;
  setLoadingChange: any;
  onCancelChangeName: any;
  setName: any;
  page: string;
  id: number;
}

const onSubmitName = async ({
  changeText,
  setLoadingChange,
  onCancelChangeName,
  setName,
  id,
  page,
}: Arguments) => {
  try {
    setLoadingChange(true);
    NProgress.start();
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${page}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ name: changeText }),
      }
    );

    const newName = await resp.json();

    if (resp.status >= 200) {
      onCancelChangeName();
      setName(newName);
      setLoadingChange(false);
      NProgress.done();
    }
  } catch (error) {
    console.log(error);
    setLoadingChange(false);
    toast.error("Не удалось изменить");
    NProgress.done();
  }
};

export default onSubmitName;
