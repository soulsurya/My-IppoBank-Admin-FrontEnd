import React, { useState } from "react";
import { getValue } from "../../utils/Validator";
import DropDown from "../DropDown";

import css from "./LoanFilter.module.css";

const LoanFilter = (props) => {
  const LoanOptions = [
    {
      text: "Applied",
      value: "APPLIED",
    },
    {
      text: "Approved",
      value: "APPROVED",
    },
    {
      text: "Best performing loans",
      value: "BEST_PERFORMING_LOANS",
    },
    // {
    //   text: "Rejected",
    //   value: "REJECTED  ",
    // }
  ];

  const [filterDetails, setFilterDetails] = useState({});

  const handleInputChange = (event) => {
    filterDetails[event.target.name] = event.target.value;
    setFilterDetails({ ...filterDetails });
  }

  const handleSearch = () => {
    props.onSearchClick(filterDetails);
  }

  return (
    <div>
      <div className={css.row}>
        <div className={css.rowLabel}>Filters:</div>
        <div className={css.inputFieldsContainer}>
          <div className={css.inputContainer}>
            <DropDown
              options={LoanOptions}
              shouldShowEmptyOption={false}
              label="Loan Status"
              onInputChange={handleInputChange}
              keyName={"loanStatus"}
              value={getValue(filterDetails, "loanStatus", "")}
            />
          </div>
        </div>
        <div className={css.searchButton}>
          <button className="button is-info"  onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanFilter;
