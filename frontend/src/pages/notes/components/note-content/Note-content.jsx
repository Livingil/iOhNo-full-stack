import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectNote, selectNotes, selectUser } from '../../../../redux/selectors';
import { Icon } from '../../../../components';
import { saveNote } from '../../../../redux/actions';
import { Textarea } from '../../../../components/markup-components';
import styles from './Note-content.module.css';

export const NoteContent = ({ flagNewNoteButton, handleSetFlagNewNoteButton }) => {
	const [textTitle, setTextTitle] = useState('');
	const [textContent, setTextContent] = useState('');

	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const note = useSelector(selectNote);
	const notes = useSelector(selectNotes);

	const noteDefault = notes[0];

	const handleChange = (event, setter) => {
		setter(event.target.value);
	};

	useEffect(() => {
		setTextTitle(note?.title ?? noteDefault?.title ?? '');
		setTextContent(note?.content ?? noteDefault?.content ?? '');
	}, [note, noteDefault]);

	useEffect(() => {
		const isSame = note && note?.title === textTitle && note?.content === textContent;
		handleSetFlagNewNoteButton(isSame);
	}, [handleSetFlagNewNoteButton, textTitle, textContent, note]);

	const handleSaveNote = (event) => {
		event.preventDefault();
		dispatch(
			saveNote(
				{
					id: note?.id ?? noteDefault?.id,
					title: textTitle,
					content: textContent,
					authorId: user.id,
				},
				notes,
			),
		);
	};

	return (
		<form className={styles.form}>
			<div className={styles.header}>
				<Textarea
					className={'NoteTitle'}
					value={textTitle}
					onChange={(event) => handleChange(event, setTextTitle)}
				/>
				<div className={flagNewNoteButton ? styles.disabled : styles.buttonSave}>
					<Icon id="fa-floppy-o" onClick={() => handleSaveNote(event)} />
				</div>
			</div>
			<Textarea
				className={'NoteContent'}
				value={textContent}
				onChange={(event) => handleChange(event, setTextContent)}
			/>
		</form>
	);
};

NoteContent.propTypes = { flagNewNoteButton: PropTypes.bool, handleSetFlagNewNoteButton: PropTypes.func };
