import styles from './Loader.module.css';

export const Loader = () => {
	return (
		<div className={styles.loaderContainer}>
			<div className={styles.loader}>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
			</div>
			<p className={styles.loadingText}>Loading...</p>
		</div>
	);
};
