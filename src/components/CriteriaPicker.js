// Libraries
import React from "react";
import { observer } from "mobx-react";

const CriteriaPicker = ({ criterias, handleCriteriaSelect }) => {
  return (
    <select class="form-select" multiple aria-label="multiple select example">
      {criterias.map((criteria_) => (
        <option
          value={criteria_}
          key={criteria_.id}
          onClick={() => handleCriteriaSelect(criteria_.name)}
        >
          {criteria_.name} - {criteria_.weight}
        </option>
      ))}
    </select>
  );
};

export default observer(CriteriaPicker);
