import ChangeTextArea from "components/ChangeTextarea/ChangeTextArea";
import { h2 } from "constants/Index";
import { useState } from "react";
import styles from "styles/pages/admin/index.module.scss";

export default function Home() {
  const [isChangeH2, setChangeH2] = useState<boolean>(false);
  const [isChangeH3, setChangeH3] = useState<boolean>(false);

  const handleChangeH2 = () => {
    setChangeH2(true);
  };

  const handleChangeH3 = () => {
    setChangeH3(true);
  };

  const onCancelChangesH2 = () => {
    setChangeH2(false);
  };

  const onCancelChangesH3 = () => {
    setChangeH3(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <ChangeTextArea
          isChange={isChangeH2}
          text={h2}
          stylesForm={styles.form}
          stylesDefault={styles.h2}
          handleChange={handleChangeH2}
          defaultType={"h2"}
          textareaHeight={"6em"}
          onCancelChanges={onCancelChangesH2}
        />

        <ChangeTextArea
          isChange={isChangeH3}
          text={"Мы находимся по адресу: Межозерный, Ленина 53"}
          stylesForm={styles.form}
          stylesDefault={styles.h3}
          handleChange={handleChangeH3}
          defaultType={"h3"}
          onCancelChanges={onCancelChangesH3}
        />

        {/* <div className={styles.doors}>
          {doors.map((door, index) => (
            <button
              key={index}
              className={clsx(styles.button, { [styles.iterior]: index === 1 })}
              onClick={() => handlePage(index, router)}
            >
              {door} двери
            </button>
          ))}
        </div> */}
      </div>
    </>
  );
}
