import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrorUser, selectIsLoadingUser, selectNotes, selectUser } from '../../redux/selectors';
import { formatDate, getRoleName } from '../../utils';
import { H2 } from '../../components/markup-components';
import { ErrorContent, Loader } from '../../components';
import { setErrorUser, setIsLoadingUser, setUser, thunkPatch } from '../../redux/actions';
import { ROLE } from '../../constans';
import styles from './Profile.module.css';
import { InputRow } from './components/input-row/Input-row';

export const ProfilePage = () => {
	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const notes = useSelector(selectNotes);
	const isLocalLoading = useSelector(selectIsLoadingUser);
	const errorMessage = useSelector(selectErrorUser);

	const initialAvatarUrl = user.avatar;
	const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
	const initialCity = user.city;
	const [city, setCity] = useState(initialCity);

	useEffect(() => {
		if (user) {
			setAvatarUrl(user.avatar || '');
			setCity(user.city || '');
		}
	}, [user]);

	const isChangedAvatar = avatarUrl !== initialAvatarUrl;
	const isChangedCity = city !== initialCity;

	const onSaveAvatarUrl = () => {
		if (!isChangedAvatar) return;
		dispatch(thunkPatch(`/users/${user.id}`, setUser, setIsLoadingUser, setErrorUser, { image_url: avatarUrl }));
	};

	const onSaveCity = () => {
		if (!isChangedCity) return;
		dispatch(thunkPatch(`/users/${user.id}`, setUser, setIsLoadingUser, setErrorUser, { city: city }));
	};

	if (isLocalLoading) {
		return <Loader />;
	}

	return (
		<ErrorContent access={[ROLE.ADMIN, ROLE.USER]} error={errorMessage}>
			<div className={styles.ProfileCard}>
				<div className={styles.header}>
					<img src={user.avatar} alt="User avatar" className={styles.avatar} />
					<div className={styles.info}>
						<h2 className={styles.login}>{user.login}</h2>
						<div className={styles.meta}>City: {city}</div>
						<div className={styles.meta}>Role: {getRoleName(user.roleId)}</div>
						<div className={styles.meta}>Registered: {formatDate(user.registeredAt)}</div>
					</div>
				</div>

				<div className={styles.imgUrl}>
					Change avatar:
					<InputRow
						placeholder={'Enter a new URL for the avatar'}
						value={avatarUrl}
						onChange={(e) => setAvatarUrl(e.target.value)}
						onClick={onSaveAvatarUrl}
						isChanged={isChangedAvatar}
					/>
				</div>
				<div className={styles.imgUrl}>
					Change city:
					<InputRow
						placeholder={'Enter a new city'}
						value={city}
						onChange={(e) => setCity(e.target.value)}
						onClick={onSaveCity}
						isChanged={isChangedCity}
					/>
				</div>

				<H2 style={{ margin: '20px' }}>Notes count: {notes.length}</H2>
			</div>
		</ErrorContent>
	);
};
