import axios from "axios";

const logout = () => axios.delete(`/session`);

const signup = payload =>
  axios.post("/users", {
    user: payload,
  });

const login = payload =>
  axios.post("/session", {
    login: payload,
  });

const authApi = {
  signup,
  login,
  logout,
};

export default authApi;
