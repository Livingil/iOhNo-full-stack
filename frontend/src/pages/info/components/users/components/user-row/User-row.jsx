import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '../../../../../../components';
import { useClickUrl } from '../../../../../../hooks';
import { formatDate, request } from '../../../../../../utils';
import { PROP_TYPE } from '../../../../../../constans';
import styles from './User-row.module.css';

export const UserRow = ({ user, roles, onUserRemove }) => {
	const [initialRoleId, setInitialRoleId] = useState(user.roleId);
	const [selectedRoleId, setSelectedRoleId] = useState(user.roleId);

	const clickUrl = useClickUrl(`/info/users/${user.id}`);

	const inSaveButtonDisabled = selectedRoleId === initialRoleId;

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(target.value);
	};

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	return (
		<div onClick={clickUrl} className={styles.tableRow}>
			<div className={styles.loginColumn}>{user.login}</div>
			<div className={styles.regAtColumn}>{formatDate(user.registeredAt)}</div>
			<div className={styles.roleColumn} onClick={(e) => e.stopPropagation()}>
				<select value={selectedRoleId} onChange={onRoleChange} onClick={(e) => e.stopPropagation()}>
					{roles.map((role) => (
						<option key={role.id} value={role.id} onClick={(e) => e.stopPropagation()}>
							{role.name}
						</option>
					))}
				</select>
			</div>
			<div className={styles.buttons}>
				<div
					className={styles.buttonSave}
					style={{ color: inSaveButtonDisabled ? '#000' : '' }}
					onClick={(e) => e.stopPropagation()}
				>
					<Icon
						id="fa-floppy-o"
						onClick={(e) => {
							e.stopPropagation();
							onRoleSave(user.id, selectedRoleId);
						}}
					/>
				</div>
				<div className={styles.buttonTrash} onClick={(e) => e.stopPropagation()}>
					<Icon
						id="fa-trash-o"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onUserRemove();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

UserRow.propTypes = { user: PROP_TYPE.USER, roles: PROP_TYPE.ROLE, onUserRemove: PropTypes.func };
