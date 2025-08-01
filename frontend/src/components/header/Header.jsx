import { Logo, ControlPanel } from './components';
import styles from './Header.module.css';

export const Header = () => {
	return (
		<div className={styles.Header}>
			<Logo />
			<ControlPanel />
		</div>
	);
};
