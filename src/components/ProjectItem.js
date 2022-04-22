// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

// Navigation
import { useNavigate } from "react-router-dom";

// Stores
import teamStore from "../stores/teamStore";

// Components
import AddTeamModal from "./AddTeamModal";

const ProjectItem = ({ project }) => {
  let navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [newTeam, setNewTeam] = useState({
    name: "",
    members: "",
  });

  const handleChange = (event) =>
    setNewTeam({ ...newTeam, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await teamStore.createTeam(newTeam, project.id);
    navigate("/home");
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const teams = teamStore.teams.filter(
    (team) => team.project.id === project.id
  );
  const teamsList = teams.map((team) => team.name);
  return (
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        key={project.id}
        style={{ background: "linen" }}
      >
        {project.name} -{" "}
        {teams.length > 0 ? teamsList.join(", ") : "No teams yet"}
        <button
          type="button"
          class="btn btn-outline-dark"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={openModal}
        >
          Add team
        </button>
        <div style={{ position: "absolute", zIndex: 1 }}>
          <AddTeamModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            newTeam={newTeam}
            project={project}
          />
        </div>
      </li>
    </ul>
  );
};

export default observer(ProjectItem);
