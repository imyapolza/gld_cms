import clsx from "clsx";
import React, { useState } from "react";
import styles from "./styles.module.scss";

interface Props {
  isChange: boolean;
  text: string;
  stylesForm: string;
  stylesDefault: string;
  defaultType: "h2" | "h3" | "a";
  handleChange: () => void;
  onCancelChanges: () => void;
  textareaHeight?: string;
  textAreaWidth?: string;
  buttonClass?: string;
}

const ChangeTextArea = ({
  defaultType,
  isChange,
  text,
  stylesForm,
  stylesDefault,
  handleChange,
  onCancelChanges,
  textareaHeight,
  textAreaWidth,
  buttonClass,
}: Props): JSX.Element => {
  const [textareaValue, setTextareaValue] = useState<string>(text);

  return (
    <>
      {isChange ? (
        <form className={stylesForm}>
          <textarea
            style={{ height: textareaHeight }}
            value={textareaValue}
            className={clsx(stylesDefault, styles.textarea)}
            onChange={(e) => setTextareaValue(e.target.value)}
          />

          <div>
            <button
              className={clsx(styles.button, buttonClass)}
              style={{ width: textAreaWidth }}
            >
              Сохранить изменения
            </button>
            <button
              className={clsx(styles.button, buttonClass)}
              type="button"
              onClick={onCancelChanges}
              style={{ marginLeft: "10px", width: textAreaWidth }}
            >
              Отменить
            </button>
          </div>
        </form>
      ) : (
        <>
          {defaultType === "h2" && (
            <h2 className={stylesDefault} onClick={handleChange}>
              {textareaValue}
            </h2>
          )}

          {defaultType === "h3" && (
            <h3 className={stylesDefault} onClick={handleChange}>
              {textareaValue}
            </h3>
          )}

          {defaultType === "a" && (
            <a className={stylesDefault} onClick={handleChange}>
              {textareaValue}
            </a>
          )}
        </>
      )}
    </>
  );
};

export default ChangeTextArea;
