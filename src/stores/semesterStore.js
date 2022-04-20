import { makeAutoObservable } from "mobx";
import instance from "./instance";

class SemesterStore {
  constructor() {
    makeAutoObservable(this);
  }
  semesters = [];
  loading = true;

  fetchSemesters = async () => {
    try {
      const res = await instance.get("/semesters/");
      this.semesters = res.data;
      this.loading = false;
    } catch (error) {
      console.log("SemesterStore -> semesterList -> error", error);
    }
  };

  createSemester = async (newSemester) => {
    try {
      const formData = new FormData();
      for (const key in newSemester) formData.append(key, newSemester[key]);
      const res = await instance.post("/semester/", formData);
      this.semesters.push(res.data);
    } catch (error) {
      console.log("SemesterStore -> semesterList -> error", error);
    }
  };
}

const semesterStore = new SemesterStore();
semesterStore.fetchSemesters();

export default semesterStore;
