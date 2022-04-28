// Libraries
import React from "react";
import { observer } from "mobx-react";

// Navigation
import { Link } from "react-router-dom";

// Stores
import projectStore from "../stores/projectStore";
import teamStore from "../stores/teamStore";
import scoreStore from "../stores/scoreStore";

// Components
import TeamHeader from "../components/TeamHeader";
import ShareLinkModal from "../components/ShareLinkModal";

// Styles
import "./styles.css";
import { BsHouseFill, BsLockFill, BsShareFill } from "react-icons/bs";

const ProjectDetailScreen = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const project = projectStore.project;

  const teams = teamStore.teams.filter(
    (team) => team.project.id === project.id
  );
  const teamsList = teams.map((team) => (
    <TeamHeader team={team} key={team.id} />
  ));
  const scores = scoreStore.scores;
  const judges = scoreStore.scores.map((score) => score.judge);

  function onlyUniqueJudges(value, index, self) {
    return self.indexOf(value) === index;
  }

  const uniqueJudges = judges.filter(onlyUniqueJudges);

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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
            <Link to="/home">
              <BsHouseFill size={40} color={"black"} />
            </Link>
            <div
              class="collapse navbar-collapse position-absolute top-0 end-0"
              id="navbarContent"
            >
              <ul class="navbar-nav me-auto">
                <li class="nav-item">
                  <BsShareFill
                    size={40}
                    color={"black"}
                    style={{ margin: 10 }}
                    onClick={openModal}
                  />
                </li>
                <li class="nav-item">
                  <BsLockFill
                    size={40}
                    color={"black"}
                    style={{ margin: 10 }}
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>
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
              This project has been graded by {uniqueJudges.length} judges
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
                <td>
                  {
                    scores.filter(
                      (score) => score.criteria.id === criteria_.id
                    )[0].score
                  }
                </td>
                <td>{criteria_.weight}</td>
                <td>{project.weight}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <h2 style={{ textAlign: "right" }}>Total: 100%</h2>
      </div>
      <div style={{ position: "absolute", zIndex: 1 }}>
        <ShareLinkModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          url={project.detail}
        />
      </div>
    </div>
  );
};

export default observer(ProjectDetailScreen);
