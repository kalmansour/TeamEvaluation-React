// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

// Navigation
import { useParams, Link, useNavigate } from "react-router-dom";

// Stores
import projectStore from "../stores/projectStore";
import semesterStore from "../stores/semesterStore";

const AddProject = () => {
  let navigate = useNavigate();
  const { semesterId } = useParams();
  const [newProject, setNewProject] = useState({
    name: "",
    weight: "",
  });

  const handleChange = (event) =>
    setNewProject({ ...newProject, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await projectStore.createProject(newProject, semesterId);
    navigate("/home");
  };

  const findSemester = semesterStore.semesters.filter(
    (semester) => semester.id === parseInt(semesterId)
  );

  return (
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
            Add Project
          </h1>
          <h4
            style={{
              textAlign: "center",
            }}
          >
            {findSemester[0].name}
          </h4>
        </div>
      </div>
      <div
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
          paddingBottom: 60,
          paddingLeft: 40,
          paddingRight: 40,
          paddingTop: 60,
          border: "solid",
          borderWidth: 1,
        }}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Project Name:
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="name"
                aria-label="name"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                name={"name"}
                value={newProject.name}
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Project Weight:
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="weight"
                aria-label="weight"
                aria-describedby="basic-addon1"
              />
            </div>
            <Link to="/home">
              <button class="btn btn-outline-danger float-end" type="button">
                Cancel
              </button>
            </Link>
            <button
              class="btn btn-outline-primary float-end"
              type="submit"
              style={{ marginRight: 10 }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(AddProject);
