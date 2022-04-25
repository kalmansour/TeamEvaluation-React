// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

// Navigation
import { Link, useNavigate } from "react-router-dom";

// Stores
import criteriaStore from "../stores/criteriaStore";

const AddCriteria = () => {
  let navigate = useNavigate();
  const [newCriteria, setNewCriteria] = useState({
    name: "",
    weight: "",
  });

  const handleChange = (event) =>
    setNewCriteria({ ...newCriteria, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await criteriaStore.createCriteria(newCriteria);
    navigate("/home");
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
        <div style={{ flexDirection: "column" }}>
          <h1
            style={{
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            Add Criteria
          </h1>
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
                Criteria Name:
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Enter criteria name"
                aria-label="name"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                name={"name"}
                value={newCriteria.name}
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Project Weight:
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Enter criteria weight"
                aria-label="weight"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                name={"weight"}
                value={newCriteria.weight}
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

export default observer(AddCriteria);
