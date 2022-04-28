// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

// Navigation
import { useParams } from "react-router-dom";

// Stores
import teamStore from "../stores/teamStore";
import projectStore from "../stores/projectStore";

// Component
import TeamItem from "../components/TeamItem";

const EvaluationScreen = () => {
  const { projectId, judgeName } = useParams();
  const [newScore, setNewScore] = useState({
    judge: judgeName,
    score: "",
    note: "",
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
      projectId={projectId}
      judgeName={judgeName}
    />
  ));

  projectStore.fetchProjectDetails(parseInt(projectId));
  const project = projectStore.project;

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
          <h1
            style={{
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {project === null ? "loading" : project.name}
          </h1>
          <h3
            style={{
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {project === null ? "loading" : project.semester.name}
          </h3>
          <h4
            style={{
              textAlign: "center",
              textTransform: "capitalize",
              margin: 10,
            }}
          >
            {judgeName === null ? "loading" : `Hi ${judgeName}`}
          </h4>
        </div>
      </div>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 20,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        {teamsList}
      </div>
    </div>
  );
};

export default observer(EvaluationScreen);
