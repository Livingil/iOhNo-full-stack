import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comment } from './components';
import { addComment, setErrorUser, setIsLoadingUser, thunk, thunkPost } from '../../../../../../../../redux/actions';
import { selectUser, selecLoadUser } from '../../../../../../../../redux/selectors';
import { Icon } from '../../../../../../../../components';
import { Textarea } from '../../../../../../../../components/markup-components';
import styles from './Comments.module.css';

export const Comments = () => {
	const [newComment, setNewComment] = useState('');
	const [saveDisabled, setSaveDisabled] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const isSame = newComment === '';
		setSaveDisabled(isSame);
	}, [dispatch, newComment]);

	const user = useSelector(selectUser);
	const loadUser = useSelector(selecLoadUser);

	const onNewCommentAdd = (userId, content) => {
		dispatch(
			thunkPost(`/users/${loadUser.id}/comments`, addComment, setIsLoadingUser, setErrorUser, {
				userId,
				content,
			}),
		);
		setNewComment('');
	};

	return (
		<div className={styles.Comments}>
			<div className={styles.newComment}>
				<div className={styles.textarea}>
					<Textarea value={newComment} onChange={({ target }) => setNewComment(target.value)} />
				</div>
				<div className={saveDisabled ? styles.disabled : styles.button}>
					<Icon id="fa-paper-plane-o" onClick={() => onNewCommentAdd(user.id, newComment)} />
				</div>
			</div>
			<div>
				{loadUser?.comments?.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						userId={user.id}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};
