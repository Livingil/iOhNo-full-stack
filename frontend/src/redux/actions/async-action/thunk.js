import { request } from '../../../utils';
import { setErrorReset } from '../error/error-reset';

export const thunk = (url, setterData, setterIsloading, setterError) => {
	return (dispatch) => {
		dispatch(setterIsloading(true));
		dispatch(setErrorReset());

		request(url)
			.then(({ error, data }) => {
				console.log('data', data);
				console.log('error', error);

				if (error) {
					dispatch(setterError(error));
					dispatch(setterIsloading(false));
				} else {
					dispatch(setterData(data));
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
