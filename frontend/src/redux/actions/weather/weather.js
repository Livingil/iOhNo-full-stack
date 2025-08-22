import { ACTION_TYPE } from '../action-type';

export const setWeather = (data) => ({ type: ACTION_TYPE.SET_WEATHER, payload: data });
