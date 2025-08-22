import { ACTION_TYPE } from '../action-type';

export const deleteNoteFromAllNotes = (id) => ({ type: ACTION_TYPE.DELETE_NOTE_FROM_ALL_NOTES, payload: id });
