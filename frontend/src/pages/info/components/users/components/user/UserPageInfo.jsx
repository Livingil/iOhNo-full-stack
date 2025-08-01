import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { H2 } from '../../../../../../components/markup-components';
import { ROLE } from '../../../../../../constans';
import { ErrorContent, Loader } from '../../../../../../components';
import { formatDate, request } from '../../../../../../utils';
import styles from './UserPageInfo.module.css';

export const UserPageInfo = () => {
	const [notes, setNotes] = useState([]);
	const [user, setUser] = useState({});
	const [isLocalLoading, setIsLocalLoading] = useState(true);

	const params = useParams();

	const navigate = useNavigate();

	const handleClick = (noteId) => {
		navigate(`/info/notes/${noteId}`);
	};

	useLayoutEffect(() => {
		Promise.all([request('/notes/all'), request(`/users/${params.id}`)]).then(
			([
				{
					data: { lastPage, notes },
				},
				{ data: user },
			]) => {
				setUser(user);
				setNotes(notes);
				setIsLocalLoading(false);
			},
		);
	}, [params.id]);

	const role = Object.keys(ROLE).find((key) => ROLE[key] === user?.roleId);

	const userNotes = notes?.filter((note) => note.authorId === user?.id);

	if (isLocalLoading) {
		return <Loader />;
	}

	return (
		<ErrorContent access={ROLE.ADMIN} error={''}>
			<div className={styles.UserPage}>
				<H2 style={{ width: '30%' }}> User: </H2>
				<div className={styles.userInfoContainer}>
					<div className={styles.infoUser}>
						<div className={styles.infoRow}>
							Login:<div className={styles.infoText}>{user?.login}</div>
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
					{notes.map(
						(note) =>
							note.authorId === user.id && (
								<div key={note.id} className={styles.noteRow} onClick={() => handleClick(note.id)}>
									{note.title} <div>{formatDate(note.creationAt)}</div>
								</div>
							),
					)}
				</div>
			</div>
		</ErrorContent>
	);
};
