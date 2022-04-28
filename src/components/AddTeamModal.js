// Libraries
import React from "react";
import Modal from "react-modal";
import { observer } from "mobx-react";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 600,
  },
};

const AddTeamModal = ({
  modalIsOpen,
  closeModal,
  handleChange,
  handleSubmit,
  project,
  newTeam,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <h4 style={{ textAlign: "center" }}>
        {project.semester.name}: {project.name}
      </h4>
      <form onSubmit={handleSubmit}>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">
            Team Name:
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Enter team name"
            aria-label="Recipient's username with two button addons"
            onChange={handleChange}
            name={"name"}
            value={newTeam.name}
          />
        </div>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">
            Members' Name:
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Seperate names with comma"
            aria-label="Recipient's username with two button addons"
            onChange={handleChange}
            name={"members"}
            value={newTeam.members}
          />
        </div>
        <button
          class="btn btn-outline-danger float-end"
          type="submit"
          style={{ marginTop: 10 }}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default observer(AddTeamModal);
