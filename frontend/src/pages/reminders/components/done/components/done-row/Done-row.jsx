import { useState } from 'react';
import { Icon } from '../../../../../../components';
import { request } from '../../../../../../utils';
import styles from './Done-row.module.css';

export const DoneRow = ({ user, roles, onUserRemove }) => {
	const [initialRoleId, setInitialRoleId] = useState(user.roleId);
	const [selectedRoleId, setSelectedRoleId] = useState(user.roleId);

	const inSaveButtonDisabled = selectedRoleId === initialRoleId;

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(target.value);
	};

	const onRoleSave = (userId, newUserRoleId) => {
		request('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	return (
		<div className={styles.tableRow}>
			<div className={styles.loginColumn}>{user.login}</div>
			<div className={styles.regAtColumn}>{user.registeredAt}</div>
			<div className={styles.roleColumn}>
				<select value={selectedRoleId} onChange={onRoleChange}>
					{roles.map((role) => (
						<option key={role.id} value={role.id}>
							{role.name}
						</option>
					))}
				</select>
			</div>
			<div className={styles.buttons}>
				<div className={styles.buttonSave} style={{ color: inSaveButtonDisabled ? '#000' : '' }}>
					<Icon id="fa-floppy-o" onClick={() => onRoleSave(user.id, selectedRoleId)} />
				</div>
				<div className={styles.buttonTrash}>
					<Icon id="fa-trash-o" onClick={onUserRemove} />
				</div>
			</div>
		</div>
	);
};
