import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { City, Temperature, Sky } from './components';
import { setWeather } from '../../../redux/actions';
import { Loader } from '../../loader/Loader';
import styles from './Weather.module.css';

export const Weather = () => {
	const [city, setCiy] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeath] = useState('');
	const [weatherSky, setWeatherSky] = useState('');
	const [isLocalLoading, setIsLocalLoading] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Severodvinsk&units=metric&lang=ru&appid=592b40a32ebbb356bcabefd39ea0802f',
		)
			.then((res) => res.json())
			.then((data) => {
				dispatch(setWeather(data));
				setCiy(data.name);
				setTemperature(Math.round(data.main.temp));
				setWeath(data.weather[0].description);
				setWeatherSky(data.weather[0].id);
				setIsLocalLoading(false);
			});
	}, [dispatch]);

	return (
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
	);
};
