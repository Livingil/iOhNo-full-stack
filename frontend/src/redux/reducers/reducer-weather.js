import { ACTION_TYPE } from '../actions';
import { initialStateWeather } from './initial-state';

export const reducerWeather = (state = initialStateWeather, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_WEATHER: {
			return { ...state, weather: payload };
		}

		default:
			return state;
	}
};
