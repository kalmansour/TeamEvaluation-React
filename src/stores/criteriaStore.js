import { makeAutoObservable } from "mobx";
import instance from "./instance";

class CriteriaStore {
  constructor() {
    makeAutoObservable(this);
  }
  criterias = [];
  loading = true;

  fetchCriterias = async () => {
    try {
      const res = await instance.get("/criterias/");
      this.criterias = res.data;
      this.loading = false;
    } catch (error) {
      console.log("CriteriaStore -> criteriaList -> error", error);
    }
  };

  createCriteria = async (newCriteria) => {
    try {
      const formData = new FormData();
      for (const key in newCriteria) formData.append(key, newCriteria[key]);
      const res = await instance.post("/criteria/", formData);
      this.criterias.push(res.data);
    } catch (error) {
      console.log("CriteriaStore -> createCriteria -> error", error);
    }
  };
}

const criteriaStore = new CriteriaStore();
criteriaStore.fetchCriterias();

export default criteriaStore;
