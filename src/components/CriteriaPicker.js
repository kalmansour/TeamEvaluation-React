import React from "react";

const CriteriaPicker = ({ dummyCriteriaData }) => {
  return (
    <select class="form-select" multiple aria-label="multiple select example">
      {dummyCriteriaData.map((criteria) => (
        <option value={criteria} key={criteria.id}>
          {criteria.name} - {criteria.weight}
        </option>
      ))}
    </select>
  );
};

export default CriteriaPicker;
