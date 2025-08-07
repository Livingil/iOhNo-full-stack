import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserRow } from './components';
import { PAGINATION_LIMIT, ROLE } from '../../../../constans';
import { H2 } from '../../../../components/markup-components';
import { ErrorContent, Loader, Pagination, Search } from '../../../../components';
import { checkAccess, confirmed, debounce, request } from '../../../../utils';
import { selectUser } from '../../../../redux/selectors';
import styles from './UsersPageInfo.module.css';

export const UsersPageInfo = () => {
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const [isLocalLoading, setIsLocalLoading] = useState(true);

	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const user = useSelector(selectUser);

	const handleSetPage = (data) => setPage(data);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], user.roleId)) {
			return;
		}

		Promise.all([
			request(`/users/roles`),
			request(`/users?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`),
		]).then(([{ error: errorRole, data: roles }, responseUsers]) => {
			const { error: errorUsers, data } = responseUsers || {};

			const safeUsers = data?.users || [];
			const safeLastPage = data?.lastPage || 1;

			setUsers(safeUsers);
			setRoles(roles);
			setErrorMessage(errorRole || errorUsers);
			setLastPage(safeLastPage);
			setIsLocalLoading(false);
		});
	}, [shouldUpdateUserList, page, user.roleId, shouldSearch]);

	const onUserRemove = (userId, userLogin) => {
		if (!checkAccess([ROLE.ADMIN], user.roleId)) {
			return;
		}
		if (confirmed(`user: ${userLogin}`)) {
			request(`/users/${userId}`, 'DELETE').then(() => {
				setShouldUpdateUserList(!shouldUpdateUserList);
			});
			const updatedUsers = users.filter((note) => note.id !== userId);

			if (updatedUsers.length === 0 && page > 1) {
				setPage(page - 1);
				return;
			}
		}
	};

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	if (isLocalLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.UsersPage}>
			<ErrorContent access={ROLE.ADMIN} error={errorMessage}>
				<div>
					<div className={styles.header}>
						<H2 style={{ width: '30%', margin: 'auto' }}> Users: </H2>
						<Search searchPhrase={searchPhrase} onChange={onSearch} placeholderText={'Search for login'} />
					</div>
					<div>
						<div className={styles.table}>
							<div className={styles.tableHeader}>
								<div className={styles.loginColumn}>Login</div>
								<div className={styles.regAtColumn}>Registration date</div>
								<div className={styles.roleColumn}>Role</div>
							</div>
							{users?.map((user) => (
								<UserRow
									key={user.id}
									user={user}
									roles={roles.filter((role) => role.id !== ROLE.GUEST)}
									onUserRemove={onUserRemove}
								/>
							))}
							{lastPage > 1 && users.length > 0 && (
								<Pagination handleSetPage={handleSetPage} page={page} lastPage={lastPage} />
							)}
						</div>
					</div>
				</div>
			</ErrorContent>
		</div>
	);
};
