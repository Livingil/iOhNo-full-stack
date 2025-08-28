import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { City, Temperature, Sky } from './components';
import { setErrorWeather, setIsLoadingWeather, setWeather, thunk } from '../../../redux/actions';
import { Loader } from '../../loader/Loader';
import { ErrorContent } from '../../Error-content/Error-content';
import { selectErrorWeather, selectIsLoadingWeather, selectUser, selectWeather } from '../../../redux/selectors';
import styles from './Weather.module.css';

export const Weather = () => {
	const dispatch = useDispatch();
	const isLocalLoading = useSelector(selectIsLoadingWeather);
	const errorMessage = useSelector(selectErrorWeather);
	const weather = useSelector(selectWeather);
	const user = useSelector(selectUser);

	useEffect(() => {
		const userCity = user?.city || 'Moscow';

		dispatch(thunk(`/weather?city=${userCity}`, setWeather, setIsLoadingWeather, setErrorWeather));
	}, [dispatch, user]);

	return (
		<ErrorContent error={errorMessage}>
			<Link to="/weather" className={styles.WeatherContainer}>
				{isLocalLoading ? (
					<Loader />
				) : (
					<div>
						<City city={weather.name} />
						<Temperature temperature={weather.temp} />
					</div>
				)}
				<Sky weather={weather.weatherArr?.description} weatherSky={weather.weatherArr?.id} />
			</Link>
		</ErrorContent>
	);
};
