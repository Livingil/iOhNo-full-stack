import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderReminders, ReminderRow } from './components';
import { selectReminders, selectUser } from '../../redux/selectors';
import { ErrorContent, Search } from '../../components';
import { Button } from '../../components/markup-components';
import { ROLE } from '../../constans';
import { setReminders } from '../../redux/actions';
import { dateNow } from '../../utils';
import styles from './Reminders.module.css';

export const RemindersPage = () => {
	const reminders = useSelector(selectReminders);
	const user = useSelector(selectUser);
	const location = useLocation();
	const dispatch = useDispatch();

	const handleNewReminder = () => {
		// dispatch(
		// 	setNote({
		// 		id: null,
		// 		title: null,
		// 		content: null,
		// 		creationAt: null,
		// 		timeCreationAt: null,
		// 		authorId: null,
		// 	}),
		// );

		// setFlagNewNoteButton(false);

		// if (notes[0]?.title === 'New note' && notes[0]?.content === 'New note') {
		// 	return;
		// }

		const newReminder = {
			id: Date.now(),
			title: 'New reminder',
			content: 'New reminder',
			creationAt: dateNow(),
			userId: user.id,
		};

		dispatch(setReminders([newReminder, ...reminders]));
	};

	return (
		<ErrorContent access={[ROLE.ADMIN]} error={null}>
			<div className={styles.RemindersPage}>
				<HeaderReminders />
				<div className={styles.header}>
					<Search
						style={{ padding: 'auto', margin: '0' }}
						// searchPhrase={searchPhrase}
						// onChange={onSearch}
						placeholderText={'Search for title'}
					/>
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
