import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserRow } from './components';
import { PAGINATION_LIMIT, ROLE } from '../../../../constans';
import { Button, H2 } from '../../../../components/markup-components';
import { ErrorContent, Loader, Pagination, Search } from '../../../../components';
import { checkAccess, confirmed, debounce } from '../../../../utils';
import {
	selectAllUsers,
	selectErrorUsers,
	selectIsLoadingUsers,
	selectUser,
	selectUsersRole,
} from '../../../../redux/selectors';
import {
	setErrorUsers,
	setIsLoadingUsers,
	setAllUsers,
	setUsersRole,
	thunk,
	removeUser,
} from '../../../../redux/actions';
import styles from './UsersPageInfo.module.css';

export const UsersPageInfo = () => {
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [page, setPage] = useState(1);

	const [sortOrder, setSortOrder] = useState('asc');

	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const { lastPage, users } = useSelector(selectAllUsers);
	const usersRole = useSelector(selectUsersRole);
	const isLocalLoading = useSelector(selectIsLoadingUsers);
	const errorMessage = useSelector(selectErrorUsers);

	const handleSetPage = (data) => setPage(data);

	const fetchAllUsers = () => {
		dispatch(
			thunk(
				`/users?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&sortOrder=${sortOrder}`,
				setAllUsers,
				setIsLoadingUsers,
				setErrorUsers,
			),
		);
	};

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], user.roleId)) {
			return;
		}

		Promise.all([dispatch(thunk(`/users/roles`, setUsersRole, setIsLoadingUsers, setErrorUsers)), fetchAllUsers()]);
	}, [dispatch, page, user, shouldSearch, sortOrder]);

	const onUserRemove = async (userId, userLogin) => {
		if (!checkAccess([ROLE.ADMIN], user.roleId)) {
			return;
		}
		if (confirmed(`user: ${userLogin}`)) {
			await dispatch(removeUser(userId));

			if (users.length === 0 && page > 1) {
				setPage(page - 1);
			} else {
				fetchAllUsers();
			}
		}
	};

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const handleSortByLogin = () => {
		setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
								<div className={styles.loginColumn}>
									<Button onClick={handleSortByLogin}>Login {sortOrder === 'asc' ? '↑' : '↓'}</Button>
								</div>
								<div className={styles.regAtColumn}>Registration date</div>
								<div className={styles.roleColumn}>Role</div>
							</div>
							{users?.map((user) => (
								<UserRow
									key={user.id}
									user={user}
									roles={usersRole.filter((role) => role.id !== ROLE.GUEST)}
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
