import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { regFormSchema } from './components';
import { Button, H2, Input } from '../../components/markup-components';
import { setUser } from '../../redux/actions';
import { selectUser } from '../../redux/selectors';
import { ROLE } from '../../constans';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';
import styles from './Registration.module.css';

export const Registration = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '', passcheck: '' },
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Request Error: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (user.roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.Registration}>
			<H2>Registration</H2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					type={'text'}
					placeholder={'Login...'}
					{...register('login', { onChange: () => setServerError(null) })}
					style={{ width: '60%', margin: ' 0 auto 10px' }}
				/>
				<Input
					type="password"
					placeholder="Password..."
					{...register('password', { onChange: () => setServerError(null) })}
					style={{ width: '60%', margin: ' 0 auto 10px' }}
				/>
				<Input
					type="password"
					placeholder="Repeat password..."
					{...register('passcheck', { onChange: () => setServerError(null) })}
					style={{ width: '60%', margin: ' 0 auto 10px' }}
				/>
				<Button type="submit" disabled={!!formError} style={{ width: '60%' }}>
					Register
				</Button>
			</form>
			{errorMessage && <div className={styles.error}>{errorMessage}</div>}
		</div>
	);
};
