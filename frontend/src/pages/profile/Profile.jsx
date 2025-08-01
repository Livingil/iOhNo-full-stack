import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotes, selectUser } from '../../redux/selectors';
import { formatDate, getRoleName, request } from '../../utils';
import { H2, Input } from '../../components/markup-components';
import { ErrorContent, Icon } from '../../components';
import { setUser } from '../../redux/actions';
import { ROLE } from '../../constans';
import styles from './Profile.module.css';

export const ProfilePage = () => {
	const [errorMessage, setErrorMessage] = useState(null);

	const user = useSelector(selectUser);
	const notes = useSelector(selectNotes);

	const dispatch = useDispatch();

	const initialAvatarUrl = user.avatar;
	const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);

	const isChanged = avatarUrl !== initialAvatarUrl;

	const onSaveAvatarUrl = () => {
		if (!isChanged) return;

		request(`/users/${user.id}`, 'PATCH', { image_url: avatarUrl }).then(({ error, data }) => {
			dispatch(setUser(data));
			setErrorMessage(error);
		});
	};

	return (
		<ErrorContent access={[ROLE.ADMIN, ROLE.USER]} error={errorMessage}>
			<div className={styles.ProfileCard}>
				<div className={styles.header}>
					<img src={user.avatar} alt="User avatar" className={styles.avatar} />
					<div className={styles.info}>
						<h2 className={styles.login}>{user.login}</h2>
						<div className={styles.meta}>Role: {getRoleName(user.roleId)}</div>
						<div className={styles.meta}>Registered: {formatDate(user.registeredAt)}</div>
					</div>
				</div>

				<div className={styles.imgUrl}>
					<Input
						type="text"
						placeholder="Enter a new URL for the avatar"
						value={avatarUrl}
						onChange={(e) => setAvatarUrl(e.target.value)}
					/>
					<Icon
						id="fa-floppy-o"
						onClick={onSaveAvatarUrl}
						style={{
							cursor: isChanged ? 'pointer' : 'not-allowed',
							opacity: isChanged ? 1 : 0.4,
							pointerEvents: isChanged ? 'auto' : 'none',
						}}
					/>
				</div>

				<H2 style={{ margin: '20px' }}>Notes count: {notes.length}</H2>
			</div>
		</ErrorContent>
	);
};
