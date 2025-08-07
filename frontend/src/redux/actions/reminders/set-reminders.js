import { ACTION_TYPE } from '../action-type';

export const setReminders = (reminders) => ({ type: ACTION_TYPE.SET_REMINDERS, payload: reminders });
