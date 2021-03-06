// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

// Navigation
import { useParams, Link, useNavigate } from "react-router-dom";

// Stores
import projectStore from "../stores/projectStore";
import semesterStore from "../stores/semesterStore";
import criteriaStore from "../stores/criteriaStore";

// Components
import CriteriaPicker from "../components/CriteriaPicker";

const AddProject = () => {
  let navigate = useNavigate();
  const { semesterId } = useParams();
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    weight: "",
    criteria: selectedCriteria,
  });

  const handleChange = (event) =>
    setNewProject({ ...newProject, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await projectStore.createProject(newProject, semesterId);
    projectStore.fetchProjects();
    navigate("/home");
  };

  const handleCriteriaSelect = (name) => {
    if (!selectedCriteria.includes(name)) {
      setSelectedCriteria([...selectedCriteria, name]);
      setNewProject({ ...newProject, criteria: selectedCriteria });
    } else
      setSelectedCriteria([...selectedCriteria.filter((obj) => obj !== name)]);
    setNewProject({ ...newProject, criteria: selectedCriteria });
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
                onChange={handleChange}
                name={"weight"}
                value={newProject.weight}
              />
            </div>
            <div style={{ marginBottom: 100 }}>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                  Criteria:
                </span>
                <CriteriaPicker
                  criterias={criteriaStore.criterias}
                  handleCriteriaSelect={handleCriteriaSelect}
                />
              </div>
              <Link to="/addCriteria">
                <button type="button" class="btn btn-primary float-end">
                  Add Criteria
                </button>
              </Link>
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
