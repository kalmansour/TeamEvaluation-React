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

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        Welcome {authStore.user.first_name}
      </h1>
      <Link to="/">
        <h4 onClick={handleLogout}>Logout?</h4>
      </Link>
    </div>
  );
};

export default observer(AdminHome);
