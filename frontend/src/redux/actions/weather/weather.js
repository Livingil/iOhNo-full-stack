import { ACTION_TYPE } from '../action-type';

export const setWeather = (weather) => ({ type: ACTION_TYPE.SET_WEATHER, payload: weather });
