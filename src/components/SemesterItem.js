// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

// Components
import ProjectItem from "../components/ProjectItem";

const SemesterItem = ({ semester, projects }) => {
  const [showProject, setShowProject] = useState(false);

  const semesterProjects = projects.filter(
    (project) => project.semester.id === semester.id
  );

  const projectsList = semesterProjects.map((project) => (
    <ProjectItem project={project} key={project.id} />
  ));

  function showProjecthandler() {
    !showProject ? setShowProject(true) : setShowProject(false);
  }

  return (
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        key={semester.id}
      >
        {semester.name}
        <span
          class="badge bg-primary"
          key={semester.id}
          onClick={showProjecthandler}
        >
          {showProject ? "-" : "+"}
        </span>
      </li>
      {showProject ? (
        <div style={{ padding: 10 }} class="border">
          <h4 style={{ textAlign: "center" }}>Projects</h4>
          {projectsList}
        </div>
      ) : null}
    </ul>
  );
};

export default observer(SemesterItem);
