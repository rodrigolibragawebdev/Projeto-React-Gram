import styles from "./Auth.module.css";

//components
import { Link } from "react-router-dom";
import Message from "../../components/Messages/Message";

//hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  //clean all auth states

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className={styles.login}>
      <h2>ReactGram</h2>
      <p className={styles.subtitle}>Faça o login e veja o que há de novo</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {/* pode ser componentizado */}
        {!loading && <input type="submit" value="entrar" />}
        {loading && <input type="submit" value="Aguarde" disable />}
        {/* Message precisa receber  */}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>{" "}
      </p>
      {console.log(email, password)}
    </div>
  );
};
export default Login;
