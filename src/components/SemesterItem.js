// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

const SemesterItem = ({ semester, projectsList }) => {
  const [showProject, setShowProject] = useState(false);

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
