// Libraries
import React from "react";
import { observer } from "mobx-react";

// Stores
import projectStore from "../stores/projectStore";

const ProjectDetailScreen = () => {
  const project = projectStore.project;

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ flexDirection: "column" }}>
            <h1
              style={{
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              {project.name}
            </h1>
            <h4
              style={{
                textAlign: "center",
                textTransform: "capitalize",
                color: "grey",
              }}
            >
              {project.semester.name}
            </h4>
          </div>
        </div>
      </div>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Criteria</th>
              <th scope="col">Avg. Score</th>
              <th scope="col">Criteria Weight</th>
              <th scope="col">Weighted Avg.</th>
            </tr>
          </thead>
          {project.criteria.map((criteria_) => (
            <tbody>
              <tr>
                <th scope="row">{criteria_.name}</th>
                <td>20 %</td>
                <td>{criteria_.weight}</td>
                <td>{project.weight}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <h2 style={{ textAlign: "right" }}>Total: 100%</h2>
      </div>
    </div>
  );
};

export default observer(ProjectDetailScreen);
