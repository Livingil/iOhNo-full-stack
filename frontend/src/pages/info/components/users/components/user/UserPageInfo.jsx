import { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { H2 } from '../../../../../../components/markup-components';
import { ROLE } from '../../../../../../constans';
import { ErrorContent, Loader } from '../../../../../../components';
import { formatDate } from '../../../../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
	setAllNotes,
	setErrorNotes,
	setErrorUser,
	setIsLoadingUser,
	setLoadUser,
	thunk,
} from '../../../../../../redux/actions';
import { setIsLoadingNotes } from '../../../../../../redux/actions/flags/set-is-loading-notes';
import {
	selectErrorNotes,
	selectErrorUser,
	selectIsLoadingNotes,
	selectIsLoadingUser,
	selecLoadUser,
	selectAllNotes,
} from '../../../../../../redux/selectors';
import styles from './UserPageInfo.module.css';
import { Comments } from './components';

export const UserPageInfo = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLocalLoading = useSelector((state) => selectIsLoadingNotes(state) || selectIsLoadingUser(state));
	const errorMessage = useSelector((state) => selectErrorNotes(state) || selectErrorUser(state));
	const user = useSelector(selecLoadUser);
	const { lastPage, notes } = useSelector(selectAllNotes);

	const handleClick = (noteId) => {
		navigate(`/info/notes/${noteId}`);
	};

	useLayoutEffect(() => {
		Promise.all([
			dispatch(thunk('/notes/all', setAllNotes, setIsLoadingNotes, setErrorNotes)),
			dispatch(thunk(`/users/${params.id}`, setLoadUser, setIsLoadingUser, setErrorUser)),
		]);
	}, [dispatch, params.id]);

	const role = Object.keys(ROLE).find((key) => ROLE[key] === user?.roleId);

	const userNotes = notes?.filter((note) => note.authorId === user?.id);

	if (isLocalLoading) {
		return <Loader />;
	}

	return (
		<ErrorContent access={ROLE.ADMIN} error={errorMessage}>
			<div className={styles.UserPage}>
				<H2 style={{ width: '30%' }}> User: </H2>
				<div className={styles.userInfoContainer}>
					<div className={styles.infoUser}>
						<div className={styles.infoRow}>
							Login:<div className={styles.infoText}>{user?.login}</div>
						</div>
						<div className={styles.infoRow}>
							City:<div className={styles.infoText}>{user?.city}</div>
						</div>
						<div className={styles.infoRow}>
							Id:<div className={styles.infoText}>{user?.id}</div>
						</div>
						<div className={styles.infoRow}>
							Registration date:<div className={styles.infoText}>{formatDate(user?.registeredAt)}</div>
						</div>
						<div className={styles.infoRow}>
							Role:<div className={styles.infoText}>{role}</div>
						</div>
					</div>
					<img src={user.avatar} alt="Avatar" className={styles.avatar} />
				</div>
				<H2 style={{ width: '40%' }}> Number of notes: {userNotes?.length}</H2>
				<div>
					{notes?.map(
						(note) =>
							note.authorId === user.id && (
								<div key={note.id} className={styles.noteRow} onClick={() => handleClick(note.id)}>
									{note.title} <div>{formatDate(note.creationAt)}</div>
								</div>
							),
					)}
				</div>
			</div>
			<Comments />
		</ErrorContent>
	);
};
