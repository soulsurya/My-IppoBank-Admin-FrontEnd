import React, { useState } from "react";
import { useEffect } from "react";
import AccountDetails from "../../components/AccountDetails";
import Loans from "../../components/Loans";
import TopBar from "../../components/TopBar";
import UserHome from "../../components/UserHome";
import { API, CookiesKey, LoanStatuses, WebsitePageLinks } from "../../services/constants";
import { getCookie } from "../../utils/Cookies";
import css from "./Dashboard.module.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { makeGetAPICAll } from "../../services/api";
import { queryStringToObject } from "../../utils/Parser";

const Dashboard = (props) => {
  const menuOptions = {
    HOME: "HOME",
    ACCOUNT: "ACCOUNT",
    LOAN: "LOAN",
  };
  const navigate = useNavigate();
  const location = useLocation();
  let params = useParams();
  const [optionStatus, setOptionStatus] = useState(menuOptions.ACCOUNT);
  const [allDetails, setAllDetails] = useState({});

  useEffect(() => {
    if (!getCookie(CookiesKey.ippoPay)) {
      navigate(WebsitePageLinks.signIn);
    } else {
      getAllDetails();
    }
  }, []);

  useEffect(() => {
    let query = queryStringToObject(location.search);
    setOptionStatus(Object.values(menuOptions).includes(query.optionStatus) ? query.optionStatus : menuOptions.ACCOUNT)
  }, [location.search])

  const getAllDetails = () => {
    makeGetAPICAll(API.getAllDetails)
      .then(response => {
        if (response.success) {
          response.data.loans.approvedLoans = response.data.loans.approvedLoans.map(loan => {
            loan.status = LoanStatuses.APPROVED;
            return loan;
          })
          response.data.loans.loanApplications = response.data.loans.loanApplications.map(loan => {
            loan.status = LoanStatuses.APPLIED;
            return loan;
          })
          setAllDetails(response.data);
        }
      }).catch(error => {
        console.error(error);
      });
  }

  return (
    <div>
      <TopBar title={allDetails?.branchDetails?.branchName} />
      <section className="main-content columns is-fullheight">
        <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
          <ul className={css.menuList}>
            <li
              onClick={() => {
                setOptionStatus(menuOptions.ACCOUNT);
              }}
              className={`${css.menuItem} ${optionStatus === menuOptions.ACCOUNT ? css.isActive : ""
                } `}
            >
              Accounts
            </li>
            <li
              onClick={() => {
                setOptionStatus(menuOptions.LOAN);
              }}
              className={`${css.menuItem}  ${optionStatus === menuOptions.LOAN ? css.isActive : ""
                } `}
            >
              Loans
            </li>
          </ul>
        </aside>

        <div className={`container column is-10 ${css.displaySection}`}>
          {optionStatus === menuOptions.ACCOUNT && <AccountDetails accounts={allDetails.accounts} />}
          {optionStatus === menuOptions.LOAN && <Loans accounts={allDetails.accounts} loans={allDetails.loans} />}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
