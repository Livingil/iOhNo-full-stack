import { ACTION_TYPE } from '../action-type';

export const deleteUser = (id) => ({ type: ACTION_TYPE.DELETE_USER, payload: id });
