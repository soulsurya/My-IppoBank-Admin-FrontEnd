import React, { useEffect, useState } from 'react'
import infoIcon from "./../../assets/info-icon.png";
import { makePostAPICAll } from '../../services/api';
import { API, LoanStatuses, RupeeSymbol, WebsitePageLinks } from '../../services/constants';
import AlertDialog from '../AlertDialog';
import LoanFilter from '../LoanFilter';
import css from "./Loans.module.css";
import Modal from '../Modal';
import ModalHeader from '../ModalHeader';

const Loan = (props) => {
  const { accounts, loans } = props;
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [shouldShowAlertDialog, setShouldShowAlertDialog] = useState(false);
  const [shouldShowLoanDetails, setShouldShowLoanDetails] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState({});

  useEffect(() => {
    if (accounts?.length > 0) {
      setFilteredLoans([...loans.loanApplications])
    }
  }, [accounts])

  const handleSearchClick = (filterDetails) => {
    if (filterDetails.loanStatus === LoanStatuses.APPLIED) {
      setFilteredLoans([...loans.loanApplications])
    } else if (filterDetails.loanStatus === LoanStatuses.APPROVED) {
      setFilteredLoans([...loans.approvedLoans])
    } else if (filterDetails.loanStatus === LoanStatuses.BEST_PERFORMING_LOANS) {
      setFilteredLoans([...loans.loanApplications, ...loans.approvedLoans].filter(loan => loan.numberOfMissedEMIs == 0))
    }
  }

  const handleApproveClick = (loan) => {
    setSelectedLoan(loan);
    setShouldShowAlertDialog(true);
  }

  const handleAlertDialogClick = (dialogAction) => {
    setShouldShowAlertDialog(false);
    if (dialogAction) {
      approveLoan();
    }
  }

  const approveLoan = () => {
    makePostAPICAll(API.approveLoan, { applicationId: selectedLoan.applicationId })
      .then(response => {
        if (response.success) {
          window.location = WebsitePageLinks.dashboard + "?optionStatus=LOAN";
        }
      }).catch(error => console.error(error))
  }

  const handleInfoClick = (loan) => {
    setSelectedLoan(loan);
    setShouldShowLoanDetails(true);
  }

  const onModalClose = () => {
    setShouldShowLoanDetails(false);
  }

  return (
    <div className={css.tableContainer}>
      <div className={css.filterContainer}>
        <LoanFilter onSearchClick={(filterDetails) => handleSearchClick(filterDetails)} />
      </div>

      <table className="table is-fullwidth">
        <thead className={css.tableHeaderContainer}>
          <tr>
            <th className={`${css.tableHeader} has-text-centered`}>User Name</th>
            <th className={`${css.tableHeader} has-text-centered`}>Phone Number</th>
            <th className={`${css.tableHeader} has-text-centered`}>Address</th>
            <th className={`${css.tableHeader} has-text-centered`}>Status</th>
            <th className={`${css.tableHeader} has-text-centered`}>Loan Amount</th>
            <th className={`${css.tableHeader} has-text-centered`}>Loan Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredLoans.length > 0 && filteredLoans.map((loan, index) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <td className={`${css.tableData} has-text-centered`}>{loan.userName}</td>
                  <td className={`${css.tableData} has-text-centered`}>{loan.phoneNumber}</td>
                  <td className={`${css.tableData} has-text-centered`}>{loan.address.state}-{loan.address.pincode}</td>
                  <td className={`${css.tableData} has-text-centered`}>{loan.status}</td>
                  <td className={`${css.tableData} has-text-centered`}>₹{loan.loanAmount}</td>
                  <td className={`${css.tableData} has-text-centered`}>{loan.loanType}</td>
                  <td className={`${css.tableData} has-text-centered`}>
                    {loan.status === LoanStatuses.APPLIED &&
                      <button className="button is-info" onClick={() => handleApproveClick(loan)}>
                        Approve
                      </button>
                    }
                    <img className={css.icon} src={infoIcon} alt="info icon" onClick={() => handleInfoClick(loan)} />
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      {shouldShowAlertDialog && (
        <AlertDialog
          showAlert={shouldShowAlertDialog}
          onDialogActionButtonClick={(dialogAction) => handleAlertDialogClick(dialogAction)}
          title={"Confirm Approve Loan"}
          description={"Are you sure you want to approve loan?"}
          disagreeText="No"
          agreeText="Yes"
        />
      )}
      <Modal isModalOpen={shouldShowLoanDetails} handleClose={onModalClose}>
        <div className={css.modalContainer}>
          <ModalHeader title={"Loan Details"} onModalClose={onModalClose} />
          <div className={css.container}>
            <div className={css.formContainer}>
              <div className={css.column}>
                <div className={css.inputForm}>
                  <div className={`field ${css.row}`}>
                    <div className={css.labelContainer}>
                      <label className={css.label}>Loan Amount: </label>
                    </div>
                    <div className={css.inputContainer}>{RupeeSymbol}{selectedLoan.loanAmount}</div>
                  </div>
                  <div className={`field ${css.row}`}>
                    <div className={css.labelContainer}>
                      <label className={css.label}>Monthly Income: </label>
                    </div>
                    <div className={css.inputContainer}>{RupeeSymbol}{selectedLoan.monthlyIncome}</div>
                  </div>
                  <div className={`field ${css.row}`}>
                    <div className={css.labelContainer}>
                      <label className={css.label}>Loan Tenuare: </label>
                    </div>
                    <div className={css.inputContainer}>{selectedLoan.loanTenure} Years</div>
                  </div>
                </div>
              </div>
              <div className={css.column}>
                <div className={css.inputForm}>
                  <div className={`field ${css.row}`}>
                    <div className={css.labelContainer}>
                      <label className={css.label}>Interest Rate: </label>
                    </div>
                    <div className={css.inputContainer}>{selectedLoan.interestRate}%</div>
                  </div>
                  <div className={`field ${css.row}`}>
                    <div className={css.labelContainer}>
                      <label className={css.label}>Monthly Expense: </label>
                    </div>
                    <div className={css.inputContainer}>{RupeeSymbol}{selectedLoan.monthlyIncome} </div>
                  </div>
                  <div className={`field ${css.row}`}>
                    <div className={css.labelContainer}>
                      <label className={css.label}>Loan Type: </label>
                    </div>
                    <div className={css.inputContainer}>{selectedLoan.loanType} </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Loan