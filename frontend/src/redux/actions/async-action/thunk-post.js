import { request } from '../../../utils';
import { setErrorReset } from '../error/error-reset';

export const thunkPost = (url, setterData, setterIsloading, setterError, { ...props }) => {
	return (dispatch) => {
		dispatch(setterIsloading(true));
		dispatch(setErrorReset());

		request(url, 'POST', props)
			.then(({ error, data }) => {
				console.log('error', error);
				console.log('user', data);

				if (error) {
					dispatch(setterError(error));
					dispatch(setterIsloading(false));
				} else {
					dispatch(setterData(data));
					sessionStorage.setItem('userData', JSON.stringify(data));
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
