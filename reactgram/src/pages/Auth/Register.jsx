import styles from "./Auth.module.css";

// components
import { Link } from "react-router-dom";
import Message from "../../components/Messages/Message";

//hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux

import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  // usamos la em baixo no formulario (la do auth slice)
  const { loading, error } = useSelector((state) => state.auth);

  //methods
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);

    dispatch(register(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className={styles.register}>
      <h2>ReactGram</h2>
      <p className={styles.subtitle}>
        Cadastre-se para ver as fotos dos seus amigos
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde" disable />}
        {/* Message precisa receber  */}
        {error && <Message msg={error} type="error" />}
      </form>

      <p>
        Já tem conta? <Link to="/login">Faça o Login</Link>
      </p>
    </div>
  );
};
export default Register;
