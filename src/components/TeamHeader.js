// Libraries
import React from "react";
import { observer } from "mobx-react";

// Styles
import "./styles.css";

const TeamHeader = ({ team, setSelectTeamId }) => {
  console.log(team.id);
  return (
    <h5
      key={team.id}
      className="teamName"
      style={{ paddingRight: 10, paddingLeft: 10 }}
      onClick={() => setSelectTeamId(team.id)}
    >
      {team.name}
    </h5>
  );
};

export default observer(TeamHeader);
