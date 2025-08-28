import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Icon } from '../../../../../../../../../../components';
import { removeCommentAsync } from '../../../../../../../../../../redux/actions';
import { formatDate } from '../../../../../../../../../../utils';
import styles from './Comment.module.css';

export const Comment = ({ userId, id, author, publishedAt, content }) => {
	const dispatch = useDispatch();

	const onCommentRemove = (id) => {
		const delComent = confirm('Delete comment?');

		if (delComent) {
			dispatch(removeCommentAsync(userId, id));
		}
		return;
	};

	return (
		<div className={styles.CommentRow}>
			<div className={styles.Comment}>
				<div className={styles.comment}>
					<div className={styles.informationPanel}>
						<div className={styles.author}>
							<Icon id="fa-user-circle-o" />
							{author}
						</div>
						<div className={styles.publishedAt}>
							<Icon id="fa-calendar-o" />
							{formatDate(publishedAt)}
						</div>
					</div>
					<div className={styles.commentText}>{content}</div>
				</div>
			</div>
			<div className={styles.button}>
				<Icon id="fa-trash-o" size="21px" margin="0 0 0 10px" onClick={() => onCommentRemove(id)} />
			</div>
		</div>
	);
};

Comment.propTypes = {
	userId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
