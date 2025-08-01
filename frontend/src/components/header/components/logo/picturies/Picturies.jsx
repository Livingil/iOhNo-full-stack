import { Icon } from '../../../../icon/Icon';
import styles from './Picturies.module.css';

export const Picturies = () => {
	return (
		<div className={styles.Picturies}>
			<div className={styles.IconTop}>
				<Icon id="fa-apple" />
			</div>
			<div className={styles.IconBack}>
				<Icon id="fa-ban" />
			</div>
		</div>
	);
};
