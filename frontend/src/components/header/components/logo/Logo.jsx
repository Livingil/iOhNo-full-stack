import { useLocation, Link } from 'react-router-dom';
import { Picturies } from './picturies/Picturies';
import styles from './Logo.module.css';

export const Logo = () => {
	const location = useLocation();

	const pathParts = location.pathname.split('/').filter(Boolean);

	const breadcrumbs = pathParts
		.map((part, index) => {
			const path = '/' + pathParts.slice(0, index + 1).join('/');
			const label = part.charAt(0).toUpperCase() + part.slice(1);
			return { label, path };
		})
		.filter((crumb, index, array) => {
			if (index === array.length - 1 && crumb.label.length > 20) {
				return false;
			}
			return true;
		});

	return (
		<div className={styles.Logo}>
			<Link className={styles.picturiesText} to="/">
				<Picturies />
				<div>iOhNo</div>
			</Link>

			<div className={styles.breadcrumbs}>
				{breadcrumbs.map((crumb) => (
					<span key={crumb.path}>
						{' / '}
						<Link to={crumb.path}>{crumb.label}</Link>
					</span>
				))}
			</div>
		</div>
	);
};
