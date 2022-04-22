// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

// Navigation
import { Link, Navigate } from "react-router-dom";

// Components
import SemesterItem from "../components/SemesterItem";

// Stores
import authStore from "../stores/authStore";
import semesterStore from "../stores/semesterStore";
import projectStore from "../stores/projectStore";

const AdminHome = () => {
  const [show, setShow] = useState(false);
  const [newSemester, setNewSemester] = useState({
    name: "",
  });

  const handleLogout = () => {
    authStore.signout();
    if (!authStore.user) return <Navigate to="/" />;
  };

  const usersSemesters = semesterStore.semesters.filter(
    (semester) => semester.added_by.username === authStore.user.username
  );

  const semesterList = usersSemesters
    .reverse()
    .map((semester) => (
      <SemesterItem
        semester={semester}
        key={semester.id}
        projects={projectStore.projects}
      />
    ));

  const handleChange = (event) =>
    setNewSemester({ ...newSemester, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await semesterStore.createSemester(newSemester);
    setShow(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {authStore.user.first_name}'s Admin Page
        </h1>
        <Link to="/">
          <button
            class="btn btn-danger"
            onClick={handleLogout}
            style={{ position: "absolute", marginTop: -20, marginLeft: 200 }}
          >
            Logout
          </button>
        </Link>
      </div>
      <div style={{ marginTop: 100, marginBottom: 140, marginRight: 10 }}>
        <button
          type="button"
          class="btn btn-success float-end"
          onClick={() => setShow(true)}
        >
          Add Semester
        </button>
      </div>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 20,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        {show ? (
          <form onSubmit={handleSubmit}>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Enter semester name"
                aria-label="Recipient's username with two button addons"
                onChange={handleChange}
                name={"name"}
                value={newSemester.name}
              />
              <button class="btn btn-outline-secondary" type="submit">
                Save
              </button>
              <button
                class="btn btn-outline-secondary"
                type="button"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}
        {semesterList}
      </div>
    </div>
  );
};

export default observer(AdminHome);
