import PropTypes from 'prop-types';
import { IconSky } from './IconSky';
import styles from './Sky.module.css';

export const Sky = ({ weather, weatherSky }) => {
	const newWeather = weather.charAt(0).toUpperCase() + weather.slice(1);
	return (
		<div className={styles.Sky}>
			<div className={styles.text}>{newWeather}</div>
			<div className={styles.logo}>
				<IconSky weatherSky={weatherSky} />
			</div>
		</div>
	);
};

Sky.propTypes = { weather: PropTypes.string.isRequired, weatherSky: PropTypes.number.isRequired };
