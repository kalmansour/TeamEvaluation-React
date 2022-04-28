// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

// Navigation
import { useParams } from "react-router-dom";

// Stores
import teamStore from "../stores/teamStore";

// Component
import TeamItem from "../components/TeamItem";

const EvaluationScreen = () => {
  const { projectId, judgeName } = useParams();
  const [newScore, setNewScore] = useState({
    judge: judgeName,
    score: "",
  });

  const teams = teamStore.teams.filter(
    (team) => team.project.id === parseInt(projectId)
  );

  const teamsList = teams.map((team) => (
    <TeamItem
      key={team.id}
      team={team}
      newScore={newScore}
      setNewScore={setNewScore}
    />
  ));

  console.log("teamsList", teamsList);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "left",
        }}
      >
        <div>
          <h6
            style={{
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {judgeName === null ? "loading" : `Hi ${judgeName}`}
          </h6>
        </div>
      </div>
      <div>{teamsList}</div>
    </div>
  );
};

export default observer(EvaluationScreen);
