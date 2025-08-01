import { useEffect, useState } from 'react';
import { DoneRow } from './components';
import { ROLE } from '../../../../constans';
import { ErrorContent } from '../../../../components';
import { request } from '../../../../utils';
import styles from './Done.module.css';

export const DonePage = () => {
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	useEffect(() => {
		Promise.all([request('fetchRoles'), request('fetchUsers')]).then(([rolesRes, usersRes]) => {
			if (usersRes.ertor || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}

			setUsers(usersRes.res);
			setRoles(rolesRes.res);
		});
	}, [shouldUpdateUserList]);

	const onUserRemove = (userId) => {
		request('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div className={styles.DonePage}>
			<ErrorContent error={errorMessage}>
				<div>
					<div>
						<div className={styles.table}>
							<div className={styles.tableHeader}>
								<div className={styles.loginColumn}>Login</div>
								<div className={styles.regAtColumn}>Registration date</div>
								<div className={styles.roleColumn}>Role</div>
							</div>
							{users.map((user) => (
								<DoneRow
									key={user.id}
									user={user}
									roles={roles.filter((role) => role.id !== ROLE.GUEST)}
									onUserRemove={() => onUserRemove(user.id)}
								/>
							))}
						</div>
					</div>
				</div>
			</ErrorContent>
		</div>
	);
};
