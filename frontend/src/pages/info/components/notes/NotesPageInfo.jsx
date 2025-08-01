import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorContent, Loader, Pagination, Search } from '../../../../components';
import { H2 } from '../../../../components/markup-components';
import { NotesRow } from './components';
import { PAGINATION_LIMIT, ROLE } from '../../../../constans';
import { checkAccess, debounce, request } from '../../../../utils';
import { selectUser } from '../../../../redux/selectors';
import styles from './NotesPageInfo.module.css';

export const NotesPageInfo = () => {
	const [notes, setNotes] = useState([]);
	const [users, setUsers] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const [isLocalLoading, setIsLocalLoading] = useState(true);

	const user = useSelector(selectUser);

	const handleSetPage = (data) => setPage(data);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], user.roleId)) {
			return;
		}

		Promise.all([
			request(`/notes/all?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`),
			request('/users/forAllNotes'),
		]).then(([resNotes, { error: errorUsers, data: users }]) => {
			const { error: errorNotes, data } = resNotes;

			const safeNotes = data?.notes || [];
			const safeLastPage = data?.lastPage || 1;

			setUsers(users);
			setNotes(safeNotes);
			setErrorMessage(errorNotes || errorUsers);
			setLastPage(safeLastPage);
			setIsLocalLoading(false);
		});
	}, [page, shouldSearch, user.roleId]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const handleNoteDelete = async (deletedNoteId) => {
		setIsLocalLoading(true);
		try {
			const updatedNotes = notes.filter((note) => note.id !== deletedNoteId);

			if (updatedNotes.length === 0 && page > 1) {
				setPage(page - 1);
				return;
			}

			if (updatedNotes.length < PAGINATION_LIMIT && page < lastPage) {
				const nextPage = page + 1;

				const { data } = await request(
					`/notes/all?search=${searchPhrase}&page=${nextPage}&limit=${PAGINATION_LIMIT}`,
				);

				const remainingSlots = PAGINATION_LIMIT - updatedNotes.length;
				const notesToAdd = data.notes.slice(0, remainingSlots);

				setNotes([...updatedNotes, ...notesToAdd]);
			} else {
				setNotes(updatedNotes);
			}
		} finally {
			setIsLocalLoading(false);
		}
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
								<div className={styles.pubAtColumn}>Publication date</div>
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
