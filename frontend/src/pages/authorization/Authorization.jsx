import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authFormSchema } from './components';
import { Button, H2, Input } from '../../components/markup-components';
import { setUser } from '../../redux/actions';
import { selectUser } from '../../redux/selectors';
import { ROLE } from '../../constans';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';
import { Loader } from '../../components';
import styles from './Authorization.module.css';

export const Authorization = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '' },
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const [isLocalLoading, setIsLocalLoading] = useState(false);

	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		setIsLocalLoading(true);
		try {
			request('/login', 'POST', { login, password }).then(({ error, user }) => {
				if (error) {
					setServerError(`Request Error: ${error}`);

					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
			});
		} finally {
			setIsLocalLoading(false);
		}
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (isLocalLoading) {
		return <Loader />;
	}

	if (user.roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.Autorization}>
			<H2>Authorization</H2>
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
				<Button type="submit" disabled={!!formError} style={{ width: '60%' }}>
					Login
				</Button>
			</form>
			<Link to="/register" className={styles.link}>
				Registration
			</Link>
			{errorMessage && <div className={styles.error}>{errorMessage}</div>}
		</div>
	);
};
