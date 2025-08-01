import PropTypes from 'prop-types';
import { Button } from '../markup-components';
import styles from './Pagination.module.css';

export const Pagination = ({ handleSetPage, page, lastPage }) => {
	return (
		<div className={styles.Pagination}>
			<Button disabled={page === 1} onClick={() => handleSetPage(1)}>
				Back to start
			</Button>
			<Button disabled={page === 1} onClick={() => handleSetPage(page - 1)}>
				Previous
			</Button>
			<div className={styles.currentPage}>Page: {page}</div>
			<Button disabled={page === lastPage} onClick={() => handleSetPage(page + 1)}>
				Next
			</Button>
			<Button disabled={page === lastPage} onClick={() => handleSetPage(lastPage)}>
				To the end
			</Button>
		</div>
	);
};

Pagination.propTypes = {
	handleSetPage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
};
