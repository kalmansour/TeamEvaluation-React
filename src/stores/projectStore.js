import { makeAutoObservable } from "mobx";
import instance from "./instance";

class ProjectStore {
  constructor() {
    makeAutoObservable(this);
  }
  projects = [];
  loading = true;
  project = null;

  fetchProjects = async () => {
    try {
      const res = await instance.get("/projects/");
      this.projects = res.data;
      this.loading = false;
    } catch (error) {
      console.log("ProjectStore -> projectList -> error", error);
    }
  };

  fetchProjectDetails = async (projectId) => {
    try {
      const res = await instance.get(`/projects/${projectId}`);
      this.project = res.data;
      this.loading = false;
    } catch (error) {
      console.log("ProjectStore -> fetchProjectDetails -> error", error);
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
// projectStore.fetchProjectDetails();

export default projectStore;
