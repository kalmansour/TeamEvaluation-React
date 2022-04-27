// Libraries
import React, { useState } from "react";
import { observer } from "mobx-react";

const TeamItem = ({ team }) => {
  const [showCriteria, setShowCriteria] = useState(false);

  function showCriteriahandler() {
    !showCriteria ? setShowCriteria(true) : setShowCriteria(false);
  }

  console.log("criteria", team.criteria);
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
            <div style={{ marginTop: 10, marginBottom: 60 }}>
              <h5>Judge Me</h5>
            </div>
            {team.project.criteria.map((criteria_) => (
              <h5>{criteria_.name}</h5>
            ))}
          </div>
        ) : null}
      </ul>
    </div>
  );
};

export default observer(TeamItem);
