import toast from "react-hot-toast";
import NProgress from "nprogress";

interface Arguments {
  changeText: string;
  setLoadingChange: (arg: boolean) => void;
  onCancelChangeName: () => void;
  setName: (name: string) => void;
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
      setName(newName.name);
      setLoadingChange(false);
      NProgress.done();
      toast.success("Название изменено");
    }
  } catch (error) {
    console.log(error);
    setLoadingChange(false);
    toast.error("Не удалось изменить название");
    NProgress.done();
  }
};

export default onSubmitName;
