declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface Item {
  characteristics: string;
  id: number;
  name: string;
  picturePath: string;
  price: number;
}

interface Characteristic {
  name: string;
  value: string;
}

interface Home {
  address: string;
  number: number;
}
