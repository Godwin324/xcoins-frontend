import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const register = (name, email, password) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("xcoins-user", JSON.stringify(response.data));
      }
    });
};

const logout = () => {
  return axios
    .post(API_URL + "logout", null, { headers: authHeader() })
    .then((response) => {
      if (response.status === 204) {
        deleteUser();
      }
    });
};

const deleteUser = () => {
  localStorage.removeItem("xcoins-user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("xcoins-user"));
};

const auth = {
  register,
  login,
  logout,
  deleteUser,
  getCurrentUser,
}
export default auth;
