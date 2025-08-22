import { request } from '../../../utils';

export const thunkAuth = (url, setterData, setterIsloading, setterError, { ...props }) => {
	return (dispatch) => {
		dispatch(setterIsloading(true));

		request(url, 'POST', props)
			.then(({ error, user }) => {
				if (error) {
					dispatch(setterError(error));
					dispatch(setterIsloading(false));
				} else {
					dispatch(setterData(user));
					sessionStorage.setItem('userData', JSON.stringify(user));
					dispatch(setterIsloading(false));
					dispatch(setterError(error));
				}
			})
			.catch((error) => {
				dispatch(setterError(error.message));
				dispatch(setterIsloading(false));
			});
	};
};
