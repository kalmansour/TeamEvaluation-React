import { makeAutoObservable } from "mobx";
import instance from "./instance";

class TeamStore {
  constructor() {
    makeAutoObservable(this);
  }
  teams = [];
  loading = true;

  fetchTeams = async () => {
    try {
      const res = await instance.get("/teams/");
      this.teams = res.data;
      this.loading = false;
    } catch (error) {
      console.log("TeamStore -> teamList -> error", error);
    }
  };

  createTeam = async (newTeam, projectId) => {
    try {
      const formData = new FormData();
      for (const key in newTeam) formData.append(key, newTeam[key]);
      const res = await instance.post(`/team/${projectId}/`, formData);
      this.teams.push(res.data);
    } catch (error) {
      console.log("TeamStore -> createTeam -> error", error);
    }
  };
}

const teamStore = new TeamStore();
teamStore.fetchTeams();

export default teamStore;
