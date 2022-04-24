import { makeAutoObservable } from "mobx";
import instance from "./instance";
import decode from "jwt-decode";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;

  setUser = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
    localStorage.setItem("access_token", token);
  };

  checkForToken = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const currentTime = Date.now() / 1000;
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
      await instance.post("/user/register/", userData);
      const login_data = {
        username: userData.username,
        password: userData.password,
      };
      const res = await instance.post("/user/login/", login_data);
      this.setUser(res.data.access);
    } catch (error) {
      console.log("AuthStore -> signup -> error", error);
    }
  };

  signin = async (userData) => {
    try {
      const res = await instance.post("/user/login/", userData);
      this.setUser(res.data.access);
    } catch (error) {
      console.log("AuthStore -> signin -> error", error);
    }
  };

  signout = () => {
    delete instance.defaults.headers.common.Authorization;
    localStorage.removeItem("access_token");
    this.user = null;
  };
}

const authStore = new AuthStore();
authStore.checkForToken();

export default authStore;
