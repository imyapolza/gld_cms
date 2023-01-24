import Button from "components/Button/Button";
import Input from "components/Input/Input";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/router";
import { useState } from "react";
import onAuthUser from "requests/post/onAuthUser";
import styles from "./styles.module.scss";

const AuthForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isError, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [isEmpty, setEmpty] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmpty(false);

    if (email.length > 0 && password.length > 0) {
      await onAuthUser({
        body: { email, password },
        setError,
        setLoading,
        router,
      });
    } else {
      setEmpty(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        className={styles.input}
        classNameLabel={styles.label}
        label={"Почта:"}
        type="email"
        autoComplete="on"
        onChange={(e) => setEmail(e.target.value.trim())}
      />
      <Input
        className={styles.input}
        classNameLabel={styles.label}
        label={"Пароль:"}
        type={"password"}
        autoComplete="on"
        onChange={(e) => setPassword(e.target.value.trim())}
      />
      {isError && (
        <span className={styles.error}>Неверный логин или пароль</span>
      )}
      {isEmpty && <span className={styles.error}>Введите почту и пароль</span>}
      {!isLoading ? <Button type="submit">Войти</Button> : <LoadingSpinner />}
    </form>
  );
};

export default AuthForm;
