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

  createProject = async (newProject, semesterId) => {
    try {
      const res = await instance.post(`/project/${semesterId}/`, newProject);
      this.projects.push(res.data);
    } catch (error) {
      console.log("ProjectStore -> projectList -> error", error);
    }
  };
}

const projectStore = new ProjectStore();
projectStore.fetchProjects();

export default projectStore;
