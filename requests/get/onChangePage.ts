import NProgress from "nprogress";

interface Arguments {
  pageName: string;
  offset: number;
  limit: number;
}

const onChangePage = async ({ pageName, offset, limit }: Arguments) => {
  try {
    NProgress.start();
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${pageName}?page=${offset}&limit=${limit}`,
      {
        method: "GET",
      }
    );

    const data = await resp.json();

    if (resp.status >= 200) {
      NProgress.done();
      return data;
    }
  } catch (error) {
    console.log(error);
    NProgress.done();
  }
};

export default onChangePage;
