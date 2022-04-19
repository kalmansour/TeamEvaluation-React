// Libraries
import { useState } from "react";
import { observer } from "mobx-react";

// Navigation
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Stores
import authStore from "../stores/authStore";

// Styles
import { ScreenTitle } from "./styles";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const handleChange = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    authStore.signup(user);
  };

  if (authStore.user) return <Navigate to="/home/" />;

  return (
    <div
      style={{
        display: "block",
        marginleft: "auto",
        marginRight: "auto",
        paddingLeft: 20,
        paddingTop: 20,
      }}
    >
      <ScreenTitle>Admin Signup</ScreenTitle>
      <form onSubmit={handleSubmit} style={{ padding: 20 }}>
        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            value={user.username}
            type="text"
            className="form-control"
            onChange={handleChange}
            style={{ width: "50%" }}
          />
        </div>
        <div className="form-group">
          <label>Firstname</label>
          <input
            name="first_name"
            value={user.first_name}
            type="text"
            className="form-control"
            onChange={handleChange}
            style={{ width: "50%" }}
          />
        </div>
        <div className="form-group">
          <label>Lastname</label>
          <input
            name="last_name"
            value={user.last_name}
            type="text"
            className="form-control"
            onChange={handleChange}
            style={{ width: "50%" }}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            value={user.password}
            type="text"
            className="form-control"
            onChange={handleChange}
            style={{ width: "50%" }}
          />
        </div>
        <button
          className="btn btn-outline-primary"
          type="submit"
          style={{ marginTop: 10 }}
        >
          Sign up
        </button>
        <Link to="/">
          <h6 style={{ marginTop: 10 }}>Already an admin user? sign in here</h6>
        </Link>
      </form>
    </div>
  );
};

export default observer(Signup);
