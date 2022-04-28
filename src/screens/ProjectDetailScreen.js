// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

// Navigation
import { Link } from "react-router-dom";

// Stores
import projectStore from "../stores/projectStore";
import teamStore from "../stores/teamStore";

// Components
import TeamHeader from "../components/TeamHeader";
import ShareLinkModal from "../components/ShareLinkModal";
import TeamReport from "../components/TeamReport";

// Styles
import "./styles.css";
import { BsHouseFill, BsLockFill, BsShareFill } from "react-icons/bs";

const ProjectDetailScreen = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectTeamId, setSelectTeamId] = useState(null);
  const project = projectStore.project;

  if (projectStore.loading || teamStore.loading) return <h1>Loading..</h1>;
  const teams = teamStore.teams.filter(
    (team) => team.project?.id === project?.id
  );
  const teamsList = teams.map((team) => (
    <TeamHeader
      team={team}
      key={team.id}
      selectTeamId={selectTeamId}
      setSelectTeamId={setSelectTeamId}
    />
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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const scoreTable = <TeamReport selectTeamId={selectTeamId} />;

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
              {project?.name}
            </h1>
            <h4
              style={{
                textAlign: "center",
                textTransform: "capitalize",
                color: "grey",
              }}
            >
              <div>{project?.semester.name}</div>
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {teamsList.length > 0 ? (
                <>{intersperse(teamsList, "| ")}</>
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
        {teams.length > 0 ? scoreTable : <></>}
      </div>
      <div style={{ position: "absolute", zIndex: 1 }}>
        <ShareLinkModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          url={project?.detail}
        />
      </div>
    </div>
  );
};

export default observer(ProjectDetailScreen);
