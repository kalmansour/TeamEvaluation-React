import { makeAutoObservable } from "mobx";
import instance from "./instance";
import decode from "jwt-decode";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;

  setUser = (token) => {
    const token_access = token.access;
    const token_refresh = token.refresh;
    instance.defaults.headers.common.Authorization = `Bearer ${token_access}`;
    this.user = decode(token_access);
    localStorage.setItem("access_token", token_access);
    localStorage.setItem("refresh_token", token_refresh);
  };

  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.signout();
      }
    }
  };

  signup = async (userData) => {
    try {
      const res = await instance.post("/user/register/", userData);
      const login_data = {
        username: userData.username,
        password: userData.password,
      };
      const res2 = await instance.post("/user/login/", login_data);
      this.setUser(res2.data);
    } catch (error) {
      console.log("AuthStore -> signup -> error", error);
    }
  };

  signin = async (userData) => {
    try {
      const res = await instance.post("/user/login/", userData);
      console.log("response data", res.data);
      this.setUser(res.data);
    } catch (error) {
      console.log("AuthStore -> signin -> error", error);
    }
  };

  signout = () => {
    delete instance.defaults.headers.common.Authorization;
    localStorage.removeItem("myToken");
    this.user = null;
  };
}

const authStore = new AuthStore();

export default authStore;
