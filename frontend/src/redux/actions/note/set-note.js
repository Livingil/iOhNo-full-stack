import { ACTION_TYPE } from '../action-type';

export const setNote = (note) => ({ type: ACTION_TYPE.SET_NOTE, payload: note });
