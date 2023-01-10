declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface Item {
  characteristics: "[object Object]";
  id: number;
  name: string;
  picturePath: string;
  price: 1200;
}
