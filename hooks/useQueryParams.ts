import { NextRouter } from "next/router";
import { useEffect } from "react";
import onChangePage from "requests/get/onChangePage";

interface Props {
  router: NextRouter;
  setItems: (data: Array<Item>) => void;
  pageName: string;
}

const useQueryParams = ({ router, setItems, pageName }: Props) => {
  useEffect(() => {
    router.push({
      query: {
        page: 1,
        limit: 8,
      },
    });
  }, []);

  const onPageChange = async (page: number) => {
    router.push({
      query: {
        page: page + 1,
        limit: 8,
      },
    });

    const generatedOffset = page * 8;

    const { results } = await onChangePage({
      pageName,
      offset: generatedOffset,
      limit: 8,
    });

    setItems(results);
  };

  return onPageChange;
};

export default useQueryParams;
