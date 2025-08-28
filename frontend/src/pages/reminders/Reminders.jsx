import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderReminders, ReminderRow } from './components';
import { selectErrorReminders, selectIsLoadingReminders, selectReminders, selectUser } from '../../redux/selectors';
import { ErrorContent, Loader, Search } from '../../components';
import { Button } from '../../components/markup-components';
import { ROLE } from '../../constans';
import { setErrorReminders, setIsLoadingReminders, setReminders, thunk } from '../../redux/actions';
import { checkAccess, dateNow } from '../../utils';
import styles from './Reminders.module.css';

export const RemindersPage = () => {
	const dispatch = useDispatch();

	const isLocalLoading = useSelector(selectIsLoadingReminders);
	const errorMessage = useSelector(selectErrorReminders);
	const reminders = useSelector(selectReminders);
	const user = useSelector(selectUser);
	const location = useLocation();

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], user.roleId)) {
			return;
		}

		dispatch(thunk('/reminders', setReminders, setIsLoadingReminders, setErrorReminders));
	}, [dispatch, user]);

	const handleNewReminder = () => {
		const newReminder = {
			id: Date.now(),
			title: 'New reminder',
			content: 'New reminder',
			creationAt: dateNow(),
			userId: user.id,
		};

		dispatch(setReminders([newReminder, ...reminders]));
	};

	if (isLocalLoading) {
		return <Loader />;
	}

	return (
		<ErrorContent access={[ROLE.ADMIN]} error={errorMessage}>
			<div className={styles.RemindersPage}>
				<HeaderReminders />

				<div className={styles.header}>
					<Search style={{ padding: 'auto', margin: '0' }} placeholderText={'Search for title'} />
				</div>

				{location.pathname !== '/reminders/done' ? (
					<>
						<div className={styles.tableHeader}>
							<div className={styles.titleColumn}>Title</div>
							<div className={styles.contentColumn}>Content</div>
							<div className={styles.pubAtColumn}>Сreation date</div>
						</div>
						<div className={styles.table}>
							{reminders?.map((reminder) => (
								<ReminderRow key={reminder.id} reminder={reminder} />
							))}
						</div>
						<Button onClick={handleNewReminder} style={{ display: 'flex' }}>
							New reminder
						</Button>
					</>
				) : (
					<Outlet />
				)}
			</div>
		</ErrorContent>
	);
};
