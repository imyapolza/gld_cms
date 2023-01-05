import { NextRouter } from "next/router";

export const handlePage = (index: number, router: NextRouter) => {
  switch (index) {
    case 0:
      router.push("interior");
      break;

    case 1:
      router.push("entrance");
      break;

    default:
      break;
  }
};
