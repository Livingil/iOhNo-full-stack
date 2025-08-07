import {
	reducerFlags,
	reducerLoadUser,
	reducerNote,
	reducerNotes,
	reducerReminders,
	reducerUser,
	reducerWeather,
} from './reducers';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
	note: reducerNote,
	notes: reducerNotes,
	reminders: reducerReminders,
	user: reducerUser,
	loadUser: reducerLoadUser,
	flags: reducerFlags,
	weather: reducerWeather,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
