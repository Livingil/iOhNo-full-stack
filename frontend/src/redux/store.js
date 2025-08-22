import {
	reducerError,
	reducerFlags,
	reducerLoadUser,
	reducerNote,
	reducerNotes,
	reducerReminders,
	reducerUser,
	reducerUsers,
	reducerWeather,
} from './reducers';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
	note: reducerNote,
	notes: reducerNotes,
	reminders: reducerReminders,
	user: reducerUser,
	users: reducerUsers,
	loadUser: reducerLoadUser,
	flags: reducerFlags,
	weather: reducerWeather,
	error: reducerError,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
