import { useSelector } from 'react-redux';
import { selectWeather } from '../../redux/selectors';
import { ErrorContent } from '../../components';
import styles from './Weather.module.css';

export const Weather = () => {
	const weather = useSelector(selectWeather);

	if (!weather) {
		return <ErrorContent error={'Error loading data'} />;
	}

	const formatDate = (timestamp) => {
		return new Date(timestamp * 1000).toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long',
			weekday: 'long',
		});
	};

	const formatTime = (timestamp) => {
		return new Date(timestamp * 1000).toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<div className={styles.weatherContainer}>
			<div className={styles.title}>
				{weather.name} {Math.round(weather.main.temp)}°C
			</div>

			<div className={styles.weatherGrid}>
				<div className={styles.weatherItem}>
					<span className={styles.weatherLabel}>Дата</span>
					<span className={styles.weatherValue}>{formatDate(weather.dt)}</span>
				</div>

				<div className={styles.weatherItem}>
					<span className={styles.weatherLabel}>Давление</span>
					<span className={styles.weatherValue}>{weather.main.pressure} гПа</span>
				</div>

				<div className={styles.weatherItem}>
					<span className={styles.weatherLabel}>Восход</span>
					<span className={styles.weatherValue}>{formatTime(weather.sys.sunrise)}</span>
				</div>

				<div className={styles.weatherItem}>
					<span className={styles.weatherLabel}>Влажность</span>
					<span className={styles.weatherValue}>{weather.main.humidity}%</span>
				</div>

				<div className={styles.weatherItem}>
					<span className={styles.weatherLabel}>Закат</span>
					<span className={styles.weatherValue}>{formatTime(weather.sys.sunset)}</span>
				</div>

				<div className={styles.weatherItem}>
					<span className={styles.weatherLabel}>Видимость</span>
					<span className={styles.weatherValue}>
						{weather.visibility >= 1000 ? `${weather.visibility / 1000} км` : `${weather.visibility} м`}
					</span>
				</div>

				<div className={styles.weatherItem}>
					<span className={styles.weatherLabel}>Ветер</span>
					<span className={styles.weatherValue}>{weather.wind.speed} м/с</span>
				</div>

				<div className={styles.weatherItem}>
					<span className={styles.weatherLabel}>Облачность</span>
					<span className={styles.weatherValue}>{weather.weather[0].description}</span>
				</div>
			</div>
		</div>
	);
};
