import { ACTION_TYPE } from '../actions';
import { initialStateWeather } from './initial-state';

export const reducerWeather = (state = initialStateWeather, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_WEATHER: {
			return {
				...state,
				weather: payload,
				weatherArr: payload.weather[0],
				name: payload.name,
				temp: Math.round(payload.main.temp),
				dt: payload.dt,
				main: payload.main,
				sys: payload.sys,
				visibility: payload.visibility,
				windSpeed: payload.wind.speed,
			};
		}

		default:
			return state;
	}
};
