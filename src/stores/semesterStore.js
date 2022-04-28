import { makeAutoObservable, flow, runInAction } from "mobx";
import instance from "./instance";

class SemesterStore {
  constructor() {
    makeAutoObservable(this);
  }
  semesters = [];
  loading = true;

  fetchSemesters = flow(function* () {
    try {
      const res = yield instance.get("/semesters/");
      runInAction(() => {
        this.semesters = res.data;
        this.loading = false;
      });
    } catch (error) {
      console.log("SemesterStore -> semesterList -> error", error);
    }
  });

  createSemester = async (newSemester) => {
    try {
      const formData = new FormData();
      for (const key in newSemester) formData.append(key, newSemester[key]);
      const res = await instance.post("/semester/", formData);
      runInAction(() => {
        this.semesters.push(res.data);
      });
    } catch (error) {
      console.log("SemesterStore -> semesterList -> error", error);
    }
  };
}

const semesterStore = new SemesterStore();
semesterStore.fetchSemesters();

export default semesterStore;
