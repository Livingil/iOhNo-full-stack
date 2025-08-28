import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorContent, Loader, Pagination, Search } from '../../../../components';
import { Button, H2 } from '../../../../components/markup-components';
import { NotesRow } from './components';
import { PAGINATION_LIMIT, ROLE } from '../../../../constans';
import { checkAccess, debounce } from '../../../../utils';
import {
	selectAllNotes,
	selectErrorNotes,
	selectErrorUsers,
	selectIsLoadingNotes,
	selectIsLoadingUsers,
	selectUser,
	selectUsers,
} from '../../../../redux/selectors';
import {
	deleteNoteFromAllNotes,
	removeNote,
	setAllNotes,
	setErrorNotes,
	setErrorUsers,
	setIsLoadingUsers,
	setUsers,
	thunk,
} from '../../../../redux/actions';
import { setIsLoadingNotes } from '../../../../redux/actions/flags/set-is-loading-notes';
import styles from './NotesPageInfo.module.css';

export const NotesPageInfo = () => {
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [page, setPage] = useState(1);

	const [sortOrder, setSortOrder] = useState('asc');

	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const { lastPage, notes } = useSelector(selectAllNotes);
	const users = useSelector(selectUsers);
	const isLocalLoading = useSelector((state) => selectIsLoadingNotes(state) || selectIsLoadingUsers(state));
	const errorMessage = useSelector((state) => selectErrorNotes(state) || selectErrorUsers(state));

	const handleSetPage = (data) => setPage(data);

	const fetchAllNotes = () =>
		dispatch(
			thunk(
				`/notes/all?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&sortOrder=${sortOrder}`,
				setAllNotes,
				setIsLoadingNotes,
				setErrorNotes,
			),
		);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], user.roleId)) {
			return;
		}

		Promise.all([
			fetchAllNotes(),
			dispatch(thunk(`/users/forAllNotes`, setUsers, setIsLoadingUsers, setErrorUsers)),
		]);
	}, [dispatch, page, shouldSearch, user, sortOrder]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const handleNoteDelete = async (deletedNoteId) => {
		await dispatch(removeNote(deletedNoteId, deleteNoteFromAllNotes));

		if (notes.length === 1 && page > 1) {
			setPage(page - 1);
		} else {
			fetchAllNotes();
		}
	};

	const handleSortByDate = () => {
		setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
	};

	if (isLocalLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.NotesPageInfo}>
			<ErrorContent error={errorMessage} access={ROLE.ADMIN}>
				<div>
					<div className={styles.header}>
						<H2 style={{ width: '30%', margin: 'auto' }}> Notes: </H2>
						<Search
							style={{ padding: 'auto', margin: '0' }}
							searchPhrase={searchPhrase}
							onChange={onSearch}
							placeholderText={'Search for title'}
						/>
					</div>

					<div>
						<div className={styles.table}>
							<div className={styles.tableHeader}>
								<div className={styles.loginColumn}>Login author</div>
								<div className={styles.titleColumn}>Title</div>
								<div className={styles.pubAtColumn}>
									<Button onClick={handleSortByDate}>
										Publication date {sortOrder === 'asc' ? '↑' : '↓'}
									</Button>
								</div>
							</div>
							{notes?.map((note) => (
								<NotesRow key={note.id} note={note} users={users} handleNoteDelete={handleNoteDelete} />
							))}
							{lastPage > 1 && notes.length > 0 && (
								<Pagination handleSetPage={handleSetPage} page={page} lastPage={lastPage} />
							)}
						</div>
					</div>
				</div>
			</ErrorContent>
		</div>
	);
};
