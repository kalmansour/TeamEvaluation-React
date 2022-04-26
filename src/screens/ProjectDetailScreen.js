// Libraries
import React from "react";
import { observer } from "mobx-react";

// Stores
import projectStore from "../stores/projectStore";
import teamStore from "../stores/teamStore";

// Components
import TeamHeader from "../components/TeamHeader";

// Styles
import "./styles.css";

const ProjectDetailScreen = () => {
  const project = projectStore.project;

  const teams = teamStore.teams.filter(
    (team) => team.project.id === project.id
  );
  const teamsList = teams.map((team, index) => (
    <TeamHeader team={team} key={team.id} />
  ));

  function intersperse(arr, sep) {
    if (arr.length === 0) {
      return [];
    }

    return arr.slice(1).reduce(
      function (xs, x, i) {
        return xs.concat([sep, x]);
      },
      [arr[0]]
    );
  }

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
          <div>
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
              <div>{project.semester.name}</div>
            </h4>
            <h6
              style={{
                textAlign: "center",
                textTransform: "capitalize",
                color: "grey",
              }}
            >
              This project has been graded by 2 judges
            </h6>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {teamsList.length > 0 ? (
                <>
                  <h5
                    style={{
                      paddingRight: 10,
                      paddingLeft: 10,
                      border: "solid",
                      borderLeft: 0,
                      borderTop: 0,
                      borderBottom: 0,
                    }}
                    className="teamName"
                  >
                    {"All"}
                  </h5>
                  {intersperse(teamsList, "| ")}
                </>
              ) : (
                <h5
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingRight: 10,
                    paddingLeft: 10,
                    textAlign: "center",
                  }}
                >
                  No teams yet
                </h5>
              )}
            </div>
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
