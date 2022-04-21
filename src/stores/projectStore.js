import { makeAutoObservable } from "mobx";
import instance from "./instance";

class ProjectStore {
  constructor() {
    makeAutoObservable(this);
  }
  projects = [];
  loading = true;

  fetchProjects = async () => {
    try {
      const res = await instance.get("/projects/");
      this.projects = res.data;
      this.loading = false;
    } catch (error) {
      console.log("ProjectStore -> projectList -> error", error);
    }
  };

  createProject = async (newProject) => {
    try {
      const formData = new FormData();
      for (const key in newProject) formData.append(key, newProject[key]);
      const res = await instance.post("/project/", formData);
      this.projects.push(res.data);
    } catch (error) {
      console.log("ProjectStore -> projectList -> error", error);
    }
  };
}

const projectStore = new ProjectStore();
projectStore.fetchProjects();

export default projectStore;
