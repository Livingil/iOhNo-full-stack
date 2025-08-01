import PropTypes from 'prop-types';
import { Icon } from '../../../../icon/Icon';
import styles from './Temperature.module.css';

export const Temperature = ({ temperature }) => {
	return (
		<div className={styles.Temperature}>
			<div className={styles.degrees}>
				<Icon id={'fa-thermometer-empty '} />
				{temperature}
				<div className={styles.celsius}>
					<Icon id={'fa-circle-o'} />
				</div>
			</div>
		</div>
	);
};

Temperature.propTypes = { temperature: PropTypes.number.isRequired };
