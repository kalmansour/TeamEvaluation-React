//Libraries
import React from "react";
import { observer } from "mobx-react";

// Navigation
import { useParams } from "react-router-dom";

// Stores
import projectStore from "../stores/projectStore";

const DoneScreen = () => {
  const { projectId, judgeName } = useParams();

  projectStore.fetchProjectDetails(projectId);

  const project = projectStore.project;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <h1 style={{ textAlign: "center" }}>{project.name}</h1>
          <h2
            style={{
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            Thanks for the evaluation {judgeName}!
          </h2>
          <img
            src="https://cdn3.iconfinder.com/data/icons/simple-web-navigation/165/tick-512.png"
            alt="tick"
            width={300}
            height={300}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(DoneScreen);
