// Libraries
import React from "react";
import { observer } from "mobx-react";

// Stores
import scoreStore from "../stores/scoreStore";

const TeamReport = ({ selectTeamId }) => {
  console.log("selectTeamId", selectTeamId);
  const teamScore = scoreStore.scores.filter(
    (score) => score.team === selectTeamId
  );
  const WAverageArray = teamScore.map(
    (score) => score.criteria_score.average_score
  );

  const initialValue = 0;
  const WAverageArraySum = WAverageArray.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  const total = WAverageArraySum / WAverageArray.length;

  const judges = teamScore.map((score) => score.judge);
  const note = teamScore.map((score) => score.note);
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const uniqueJudges = judges.filter(onlyUnique);

  return (
    <div>
      {selectTeamId ? (
        uniqueJudges.length > 0 ? (
          <h6
            style={{
              textAlign: "center",
              color: "grey",
            }}
          >
            This team has been graded by {uniqueJudges.length}{" "}
            {uniqueJudges.length > 1 ? "judges" : "judge"}
          </h6>
        ) : (
          <h6
            style={{
              textAlign: "center",
              color: "grey",
            }}
          >
            This team hasn't been graded yet
          </h6>
        )
      ) : (
        <></>
      )}
      {selectTeamId ? (
        <>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Criteria</th>
                <th scope="col">Avg. Score</th>
                <th scope="col">Criteria Weight</th>
                <th scope="col">Weighted Avg.</th>
              </tr>
            </thead>
            {teamScore.map((score) => (
              <tbody>
                <tr>
                  <th scope="row">{score.criteria_score.name}</th>
                  <td>{score.criteria_score.average_score}</td>
                  <td>{score.criteria_score.weight}</td>
                  <td>{score.criteria_score.weighted_average}</td>
                </tr>
              </tbody>
            ))}
          </table>
          {teamScore.length > 0 ? (
            <h2 style={{ textAlign: "right" }}>total {total}%</h2>
          ) : (
            <></>
          )}
          <h2
            style={{
              textAlign: "center",
            }}
          >
            Notes
          </h2>
          <hr
            style={{
              backgroundColor: "black",
              height: 5,
            }}
          />
          {teamScore.length > 0 ? (
            <h4>
              {uniqueJudges[0]} says: {note.filter(onlyUnique)[0]}
            </h4>
          ) : null}
        </>
      ) : (
        <h4 style={{ textAlign: "center" }}>Select a team from above</h4>
      )}
    </div>
  );
};

export default observer(TeamReport);
