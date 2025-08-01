import { Routs } from './routs/Routs';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorContent, Footer, Header, Loader } from './components';
import { setNotes, setUser } from './redux/actions';
import { selectUser, selectUserHash } from './redux/selectors';
import { ROLE } from './constans';
import { checkAccess, request } from './utils';
import styles from './iOhNo.module.css';

export const IOhNo = () => {
	const [errorMessage, setErrorMessage] = useState(null);

	const [isLocalLoading, setIsLocalLoading] = useState(true);

	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const hash = useSelector(selectUserHash);

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(setUser(currentUserData));
	}, [dispatch]);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN, ROLE.USER], user.roleId)) {
			setIsLocalLoading(false);
			return;
		}

		request('/notes').then(({ error, data: notes }) => {
			dispatch(setNotes(notes));
			setErrorMessage(error);
			setIsLocalLoading(false);
		});
	}, [dispatch, user.roleId, hash]);

	return (
		<div className={styles.iOhNo}>
			<Header />
			<ErrorContent error={errorMessage}>
				<div className={styles.content}>{isLocalLoading ? <Loader /> : <Routs />}</div>
			</ErrorContent>
			<Footer />
		</div>
	);
};
