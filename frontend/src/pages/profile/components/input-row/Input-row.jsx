import PropTypes from 'prop-types';
import { Icon } from '../../../../components';
import { Input } from '../../../../components/markup-components';
import styles from './Input-row.module.css';

export const InputRow = ({ placeholder, value, onChange, onClick, isChanged }) => {
	return (
		<div className={styles.imgUrl}>
			<Input type="text" placeholder={placeholder} value={value} onChange={onChange} />
			<Icon
				id="fa-floppy-o"
				onClick={onClick}
				style={{
					cursor: isChanged ? 'pointer' : 'not-allowed',
					opacity: isChanged ? 1 : 0.4,
					pointerEvents: isChanged ? 'auto' : 'none',
				}}
			/>
		</div>
	);
};

InputRow.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	isChanged: PropTypes.bool,
};
