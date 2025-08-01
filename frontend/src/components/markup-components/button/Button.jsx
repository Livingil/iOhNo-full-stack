import PropTypes from 'prop-types';
import styles from './Button.module.css';

export const Button = ({ children, ...prop }) => (
	<button className={styles.Button} {...prop}>
		{children}
	</button>
);

Button.propTypes = { children: PropTypes.node.isRequired };
