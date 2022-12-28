// services => requisições com dados fornecidos para o beckend e acessar os endpoints

import { api, requestConfig } from "../Utils/config";

// register an user
const register = async (data) => {
  // method = post / data -> dados da request
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;

    // catch
  } catch (error) {
    console.log(error);
  }
};

//logout an user

const logout = () => {
  localStorage.removeItem("user");
};

//sign in an user

const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    console.log(res);

    //aqui salva mesmo o erro na local storage, daria pra fazer um tratamento de validação de dados do usuário
    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;

// proximo passo -> cuidar desse service com o slice
