// Libraries
import React from "react";
import { observer } from "mobx-react";

const ProjectItem = ({ project }) => {
  return (
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        key={project.id}
        style={{ background: "linen" }}
      >
        {project.name}
      </li>
    </ul>
  );
};

export default observer(ProjectItem);
