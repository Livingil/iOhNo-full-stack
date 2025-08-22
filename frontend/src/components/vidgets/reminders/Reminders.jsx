import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { HeaderReminder } from './components';
import { useClickUrl } from '../../../hooks';
import { ErrorContent } from '../../Error-content/Error-content';
import { setErrorReminders, setIsLoadingReminders, setReminders, thunk } from '../../../redux/actions';
import { Loader } from '../../loader/Loader';
import { selectErrorReminders, selectIsLoadingReminders, selectReminders, selectUser } from '../../../redux/selectors';
import { checkAccess } from '../../../utils';
import { ROLE } from '../../../constans';
import styles from '../Vidgets.module.css';

export const Reminders = () => {
	const dispatch = useDispatch();
	const handleClick = useClickUrl('/reminders');

	const isLocalLoading = useSelector(selectIsLoadingReminders);
	const errorMessage = useSelector(selectErrorReminders);
	const reminders = useSelector(selectReminders);
	const user = useSelector(selectUser);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], user.roleId)) {
			return;
		}

		dispatch(thunk('/reminders', setReminders, setIsLoadingReminders, setErrorReminders));
	}, [dispatch, user]);

	return (
		<ErrorContent error={errorMessage}>
			<div onClick={handleClick} className={styles.Vidgets}>
				<HeaderReminder />
				{isLocalLoading ? <Loader /> : <span className={styles.dev}>in development</span>}
			</div>
		</ErrorContent>
	);
};
