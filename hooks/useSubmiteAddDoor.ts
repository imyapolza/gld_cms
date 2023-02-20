import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import onSubmitAddDoor from "requests/post/onSubmitAddDoor";

interface Props<T> {
  items: Array<T>;
  page: string;
  setItems: (data: Array<T>) => void;
}

const useSubmiteAddDoor = <T>({ items, page, setItems }: Props<T>) => {
  const [data, setData] = useState<Array<T>>(items);
  const [isLoadingAdd, setLoadingAdd] = useState<boolean>(false);

  const router = useRouter();

  return {
    onSubmitAddDoor: (formData: FormData) =>
      onSubmitAddDoor<T>({ formData, page, setLoadingAdd, router, setItems }),
    data,
    isLoadingAdd,
    setData,
  };
};

export default useSubmiteAddDoor;
