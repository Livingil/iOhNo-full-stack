import { request } from '../../../utils';

export const thunkPatch = (url, setterData, setterIsloading, setterError, { ...props }) => {
	return (dispatch) => {
		dispatch(setterIsloading(true));

		request(url, 'PATCH', props)
			.then(({ error, data }) => {
				if (error) {
					dispatch(setterError(error));
					dispatch(setterIsloading(false));
				} else {
					dispatch(setterData(data));
					if (!props.roleId) {
						sessionStorage.setItem('userData', JSON.stringify(data));
					}
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
