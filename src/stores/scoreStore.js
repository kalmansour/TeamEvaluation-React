// Libraries
import { makeAutoObservable } from "mobx";
import instance from "./instance";

class ScoreStore {
  constructor() {
    makeAutoObservable(this);
  }
  scores = [];
  loading = true;

  fetchScores = async () => {
    try {
      const res = await instance.get("/scores/");
      this.scores = res.data;
      this.loading = false;
    } catch (error) {
      console.log("ScoreStore -> criteriaList -> error", error);
    }
  };

  createScore = async (newScore, teamId, criteriaId) => {
    try {
      const formData = new FormData();
      for (const key in newScore) formData.append(key, newScore[key]);
      const res = await instance.post(
        `score/${teamId}/${criteriaId}/`,
        formData
      );
      this.scores.push(res.data);
    } catch (error) {
      console.log("ScoreStore -> createCriteria -> error", error);
    }
  };
}

const scoreStore = new ScoreStore();
scoreStore.fetchScores();

export default scoreStore;
