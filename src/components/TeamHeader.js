// Libraries
import React from "react";
import { observer } from "mobx-react";

// Styles
import "./styles.css";

const TeamHeader = ({ team }) => {
  return (
    <h5
      key={team.id}
      className="teamName"
      style={{ paddingRight: 10, paddingLeft: 10 }}
    >
      {team.name}
    </h5>
  );
};

export default observer(TeamHeader);
