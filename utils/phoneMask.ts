import { FormEvent, RefObject } from "react";

export const prefixNumber = (str: string) => {
  if (str === "7") {
    return "7 (";
  }
  if (str === "8") {
    return "8 (";
  }
  if (str === "9") {
    return "7 (9";
  }
  return "7 (";
};

interface Arguments {
  e: FormEvent<HTMLInputElement>;
  input: RefObject<HTMLInputElement>;
}

export const onPhoneMask = ({ e, input }: Arguments) => {
  const inputValue = input.current as HTMLInputElement;

  const value = inputValue.value.replace(/\D+/g, "");
  const numberLength = 11;

  let result;
  if (inputValue.value.includes("+8") || inputValue.value[0] === "8") {
    result = "";
  } else {
    result = "+";
  }

  //
  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
        continue;
      case 4:
        result += ") ";
        break;
      case 7:
        result += "-";
        break;
      case 9:
        result += "-";
        break;
      default:
        break;
    }
    result += value[i];
  }
  //
  (input.current as HTMLInputElement).value = result;
};
