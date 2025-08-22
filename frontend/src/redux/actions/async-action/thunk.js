import { request } from '../../../utils';

export const thunk = (url, setterData, setterIsloading, setterError) => {
	return (dispatch) => {
		dispatch(setterIsloading(true));

		request(url)
			.then(({ error, data }) => {
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
