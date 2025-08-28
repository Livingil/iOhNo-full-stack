import { Routs } from './routs/Routs';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Footer, Header } from './components';
import { setUser } from './redux/actions';
import styles from './iOhNo.module.css';

export const IOhNo = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(setUser(currentUserData));
	}, [dispatch]);

	return (
		<div className={styles.iOhNo}>
			<Header />

			<div className={styles.content}>
				<Routs />
			</div>

			<Footer />
		</div>
	);
};
