// Libraries
import React from "react";
import { observer } from "mobx-react";

const ProjectItem = ({ project, teamsData }) => {
  const teams = teamsData.map((team) => team.name);
  return (
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        key={project.id}
        style={{ background: "linen" }}
      >
        {project.name} - {teams.join(", ")}
      </li>
    </ul>
  );
};

export default observer(ProjectItem);
