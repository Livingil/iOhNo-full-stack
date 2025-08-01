import { Route, Routes } from 'react-router-dom';
import {
	Authorization,
	HomePage,
	InfoPage,
	NotesPage,
	ProfilePage,
	Registration,
	RemindersPage,
	Weather,
} from '../pages';
import { NotesPageInfo, UsersPageInfo } from '../pages/info/components';
import { NotePageInfo } from '../pages/info/components/notes/components';
import { UserPageInfo } from '../pages/info/components/users/components';
import { ErrorContent } from '../components';
import { ERROR } from '../constans';

export const Routs = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/notes" element={<NotesPage />} />
			<Route path="/login" element={<Authorization />} />
			<Route path="/register" element={<Registration />} />
			<Route path="/info" element={<InfoPage />}>
				<Route path="users" element={<UsersPageInfo />} />
				<Route path="users/:id" element={<UserPageInfo />} />
				<Route path="notes" element={<NotesPageInfo />} />
				<Route path="notes/:id" element={<NotePageInfo />} />
			</Route>
			<Route path="/weather" element={<Weather />} />

			<Route path="/reminders" element={<RemindersPage />}>
				<Route path="done" element={<div>Done in development</div>} />
			</Route>
			<Route path="/profile" element={<ProfilePage />} />

			<Route path="/create" element={<div>Create in development</div>} />
			<Route path="/vidgets" element={<div>Vidgets in development</div>} />
			<Route path="/calendar" element={<div>Сalendar in development</div>} />

			<Route path="*" element={<ErrorContent serverError={ERROR.PAGE_NOT_EXIST} />} />
		</Routes>
	);
};
