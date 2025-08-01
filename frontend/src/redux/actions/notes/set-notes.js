import { ACTION_TYPE } from '../action-type';

export const setNotes = (notes) => ({ type: ACTION_TYPE.SET_NOTES, payload: notes });
