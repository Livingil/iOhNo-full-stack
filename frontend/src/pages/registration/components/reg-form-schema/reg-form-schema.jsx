import * as yup from 'yup';

export const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Fill in your login')
		.matches(/^\w+$/, 'The login is filled in incorrectly. Only letters and numbers are allowed.')
		.min(3, 'The login is filled in incorrectly. Minimum 3 characters')
		.max(15, 'The login is filled in incorrectly. Maximum 15 characters'),
	password: yup
		.string()
		.required('Fill in your password')
		.matches(/^[\w#%]+$/, 'The password is filled in incorrectly. Only letters, numbers and #, % are allowed.')
		.min(6, 'The password is filled in incorrectly. Minimum 6 characters')
		.max(20, 'The password is filled in incorrectly. Maximum 20 characters'),
	passcheck: yup
		.string()
		.required('Fill in your check password')
		.oneOf([yup.ref('password'), null], 'The passwords do not match'),
});
