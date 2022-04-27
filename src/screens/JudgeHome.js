// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

// Navigation
import { useParams, Link } from "react-router-dom";

// Stores
import projectStore from "../stores/projectStore";
import teamStore from "../stores/teamStore";

const JudgeHome = () => {
  const [judgeName, setJudgeName] = useState(null);
  const { projectId } = useParams();

  const teams = teamStore.teams.filter(
    (team) => team.project.id === parseInt(projectId)
  );
  projectStore.fetchProjectDetails(parseInt(projectId));
  const project = projectStore.project;

  const handleChange = (event) => setJudgeName(event.target.value);

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
          <h5
            style={{
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {project === null ? "loading" : project.semester.name}
          </h5>
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">
              Judge Name:
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Judge name"
              aria-label="Recipient's username with two button addons"
              onChange={handleChange}
              name={"name"}
              value={judgeName}
            />
          </div>
          <Link to={`/projects/${projectId}/${judgeName}/score`}>
            <button
              class="btn btn-outline-danger float-end"
              type="submit"
              style={{ marginTop: 10 }}
            >
              Submit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default observer(JudgeHome);
