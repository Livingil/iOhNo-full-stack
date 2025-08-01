import PropTypes from 'prop-types';
import styles from './H2.module.css';

export const H2 = ({ children, ...props }) => (
	<h2 className={styles.H2} {...props}>
		{children}
	</h2>
);

H2.propTypes = { children: PropTypes.node.isRequired };
