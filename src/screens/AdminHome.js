// Libraries
import React from "react";
import { observer } from "mobx-react";

// Navigation
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Stores
import authStore from "../stores/authStore";

const AdminHome = () => {
  const handleLogout = () => {
    authStore.signout();
    if (!authStore.user) return <Navigate to="/" />;
  };

  const semesterList = semestersData.map((semester) => (
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        {semester.name}
        <span class="badge bg-primary">+</span>
      </li>
    </ul>
  ));

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
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 20,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        {semesterList}
      </div>
    </div>
  );
};

export default observer(AdminHome);

const semestersData = [
  {
    name: "Spring 2023",
  },
  {
    name: "Fall 2022",
  },
  {
    name: "Spring 2022",
  },
  {
    name: "Fall 2021",
  },
];
