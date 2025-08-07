import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { City, Temperature, Sky } from './components';
import { setWeather } from '../../../redux/actions';
import { Loader } from '../../loader/Loader';
import { request } from '../../../utils';
import { ErrorContent } from '../../Error-content/Error-content';
import styles from './Weather.module.css';

export const Weather = () => {
	const [city, setCiy] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeath] = useState('');
	const [weatherSky, setWeatherSky] = useState('');
	const [isLocalLoading, setIsLocalLoading] = useState(true);
	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		request('/weather').then(({ error, data }) => {
			setServerError(error);
			dispatch(setWeather(data));
			setCiy(data.name);
			setTemperature(Math.round(data.main.temp));
			setWeath(data.weather[0].description);
			setWeatherSky(data.weather[0].id);
			setIsLocalLoading(false);
		});
	}, [dispatch]);

	return (
		<ErrorContent error={serverError}>
			<Link to="/weather" className={styles.WeatherContainer}>
				{isLocalLoading ? (
					<Loader />
				) : (
					<div>
						<City city={city} />
						<Temperature temperature={temperature} />
					</div>
				)}
				<Sky weather={weather} weatherSky={weatherSky} />
			</Link>
		</ErrorContent>
	);
};
