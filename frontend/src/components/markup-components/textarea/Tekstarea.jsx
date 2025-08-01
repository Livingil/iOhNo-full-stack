import PropTypes from 'prop-types';
import styles from './Textarea.module.css';

export const Textarea = ({ className, value, onChange }) => (
	<textarea
		className={className === 'NoteTitle' ? styles.NoteTitle : styles.NoteContent}
		required
		name="noteTitle"
		id="noteTitleId"
		placeholder="Enter text"
		value={value === 'New note' ? '' : value}
		onChange={onChange}
	/>
);

Textarea.propTypes = { className: PropTypes.string, value: PropTypes.string, onChange: PropTypes.func };
