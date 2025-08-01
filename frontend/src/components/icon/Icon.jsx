import PropTypes from 'prop-types';
import styles from './Icon.module.css';

export const Icon = ({ id, ...prop }) => (
	<div className={styles.Icon} {...prop}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

Icon.propTypes = {
	id: PropTypes.string.isRequired,
};
