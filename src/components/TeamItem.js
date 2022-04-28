// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

// Stores
import scoreStore from "../stores/scoreStore";
import { Link } from "react-router-dom";

const TeamItem = ({ team, newScore, setNewScore, projectId, judgeName }) => {
  const [showCriteria, setShowCriteria] = useState(false);
  const [criteriaId, setcriteriaId] = useState(null);

  const teamId = team.id;

  function showCriteriahandler() {
    !showCriteria ? setShowCriteria(true) : setShowCriteria(false);
  }

  const criteriaIdChange = (event) => setcriteriaId(event.target.value);

  const handleChange = (event) =>
    setNewScore({ ...newScore, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await scoreStore.createScore(newScore, teamId, criteriaId);
  };

  return (
    <div>
      <ul class="list-group">
        <li
          class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-warning"
          key={team.id}
        >
          {team.name}
          <span
            class="badge bg-primary"
            key={team.id}
            onClick={showCriteriahandler}
          >
            {showCriteria ? "-" : "+"}
          </span>
        </li>
        {showCriteria ? (
          <div style={{ padding: 10 }} class="border">
            <h4 style={{ textAlign: "center" }}>Criteria</h4>
            <form onSubmit={handleSubmit}>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Criteria
                  </label>
                </div>
                <select
                  class="custom-select"
                  id="inputGroupSelect01"
                  onChange={criteriaIdChange}
                  value={criteriaId}
                >
                  {team.project.criteria.map((criteria_) => (
                    <option key={criteria_.id} value={criteria_.id}>
                      {criteria_.name}
                    </option>
                  ))}
                </select>
              </div>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  Score:
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter score"
                  aria-label="Recipient's username with two button addons"
                  onChange={handleChange}
                  name={"score"}
                  value={newScore.score}
                />
              </div>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  Note:
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter note"
                  aria-label="Recipient's username with two button addons"
                  onChange={handleChange}
                  name={"note"}
                  value={newScore.note}
                />
              </div>
              <Link to={`/projects/${projectId}/${judgeName}/score/done`}>
                <button
                  class="btn btn-outline-success float-end"
                  style={{ marginTop: 10, marginLeft: 10 }}
                >
                  Done
                </button>
              </Link>
              <button
                class="btn btn-outline-danger float-end"
                type="submit"
                style={{ marginTop: 10 }}
              >
                Submit
              </button>
            </form>
          </div>
        ) : null}
      </ul>
    </div>
  );
};

export default observer(TeamItem);
