import { useDispatch } from 'react-redux';
import { Icon } from '../../../../icon/Icon';
import styles from '../../../Vidgets-Header.module.css';
import { setTriggerNewNote } from '../../../../../redux/actions';

export const HeaderNotes = () => {
	const dispatch = useDispatch();

	const handlePlusClick = () => {
		dispatch(setTriggerNewNote(true));
	};

	return (
		<div className={styles.Header}>
			<div className={styles.logo}>
				<div className={styles.icon}>
					<Icon id="fa-file-text-o" />
				</div>
			</div>
			<div className={styles.name}>Notes</div>
			<div className={styles.plus} onClick={handlePlusClick}>
				<Icon id="fa-plus" />
			</div>
		</div>
	);
};
