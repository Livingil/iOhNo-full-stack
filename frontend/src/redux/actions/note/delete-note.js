import { ACTION_TYPE } from '../action-type';

export const deleteNote = (id) => ({ type: ACTION_TYPE.DELETE_NOTE, payload: id });
