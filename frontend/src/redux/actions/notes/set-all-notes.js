import { ACTION_TYPE } from '../action-type';

export const setAllNotes = (notes) => ({ type: ACTION_TYPE.SET_ALL_NOTES, payload: notes });
