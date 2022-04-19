// Libraries
import { useState } from "react";
import { observer } from "mobx-react";

// Navigation
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Stores
import authStore from "../stores/authStore";

// Styles
import { SigninButtonStyled, ScreenTitle } from "./styles";

const Signin = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    authStore.signin(user);
  };

  if (authStore.user) return <Navigate to="/home/" />;

  return (
    <div
      style={{
        display: "block",
        marginleft: "auto",
        marginRight: "auto",
        paddingLeft: 20,
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Welcome to Team Evaluation
      </h1>
      <ScreenTitle>Admin Signin</ScreenTitle>
      <form onSubmit={handleSubmit}>
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
          <label>Password</label>
          <input
            name="password"
            value={user.password}
            type="password"
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
          Sign in
        </button>
        <Link to="/register/">
          <h6 style={{ marginTop: 10 }}>New admin user? register here</h6>
        </Link>
      </form>
    </div>
  );
};

export default observer(Signin);
