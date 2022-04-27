import React from "react";
import { observer } from "mobx-react";

// Navigation
import { useParams } from "react-router-dom";

// Stores
import projectStore from "../stores/projectStore";
import teamStore from "../stores/teamStore";

// Component
import TeamItem from "../components/TeamItem";

const EvaluationScreen = () => {
  const { projectId, judgeName } = useParams();

  const teams = teamStore.teams.filter(
    (team) => team.project.id === parseInt(projectId)
  );
  // projectStore.fetchProjectDetails(parseInt(projectId));
  // const project = projectStore.project;

  const teamsList = teams.map((team) => <TeamItem key={team.id} team={team} />);

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
          <h1
            style={{
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {/* {project === null ? "loading" : project.name} */}
          </h1>
          <h5
            style={{
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {/* {project === null ? "loading" : project.semester.name} */}
          </h5>
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
