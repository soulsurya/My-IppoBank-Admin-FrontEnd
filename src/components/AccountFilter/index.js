import React, { useState } from "react";
import { getValue } from "../../utils/Validator";
import DropDown from "../DropDown";

import css from "./AccountFilter.module.css";

const AccountFilter = (props) => {
  const AccountTypeOptions = [
    {
      text: "All",
      value: "ALL",
    },
    {
      text: "Savings Account",
      value: "SAVINGS",
    },
    {
      text: "Checking Account",
      value: "CHECKING",
    },
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
              options={AccountTypeOptions}
              shouldShowEmptyOption={false}
              label="Account Type"
              onInputChange={handleInputChange}
              keyName={"accountType"}
              value={getValue(filterDetails, "accountType", "")}
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

export default AccountFilter;
