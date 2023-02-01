import React, { useEffect, useState } from 'react'
import AccountFilter from '../AccountFilter';
import css from "./AccountDetails.module.css";

const AccountDetails = (props) => {
	const { accounts } = props;
	const [filteredAccounts, setFilteredAccounts] = useState([]);

	useEffect(() => {
		if (accounts?.length > 0) {
			setFilteredAccounts([...accounts])
		}
	}, [accounts])

	const handleSearchClick = (filterDetails) => {
		setFilteredAccounts(accounts.filter(account => account.accountType === filterDetails.accountType || filterDetails.accountType === "ALL"))
	}

	return (
		<div className={css.tableContainer}>
			<div className={css.filterContainer}>
				<AccountFilter onSearchClick={(filterDetails) => handleSearchClick(filterDetails)} />
			</div>

			<table className="table is-fullwidth">
				<thead className={css.tableHeaderContainer}>
					<tr>
						<th className={`${css.tableHeader} has-text-centered`}>Account Type</th>
						<th className={`${css.tableHeader} has-text-centered`}>User Name</th>
						<th className={`${css.tableHeader} has-text-centered`}>Phone Number</th>
						<th className={`${css.tableHeader} has-text-centered`}>Branch Name</th>
						<th className={`${css.tableHeader} has-text-centered`}>Current Balance</th>
					</tr>
				</thead>
				<tbody>
					{filteredAccounts.length > 0 && filteredAccounts.map((account, index) => {
						return (
							<React.Fragment key={index}>
								<tr>
									<td className={`${css.tableData} has-text-centered`}>{account.accountType}</td>
									<td className={`${css.tableData} has-text-centered`}>{account.userName}</td>
									<td className={`${css.tableData} has-text-centered`}>{account.phoneNumber}</td>
									<td className={`${css.tableData} has-text-centered`}>{account.branchInformation.branchName}</td>
									<td className={`${css.tableData} has-text-centered`}>₹{account.currentBalance}</td>
								</tr>
							</React.Fragment>
						);
					})}
				</tbody>
			</table>
		</div>
	)
}

export default AccountDetails