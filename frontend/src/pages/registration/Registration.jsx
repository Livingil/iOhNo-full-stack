import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { regFormSchema } from './components';
import { Button, H2, Input } from '../../components/markup-components';
import { setErrorUser, setIsLoadingUser, setUser, thunkAuth } from '../../redux/actions';
import { selectErrorUser, selectIsLoadingUser, selectUser } from '../../redux/selectors';
import { ROLE } from '../../constans';
import { useResetForm } from '../../hooks';
import { Loader } from '../../components';
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

	const dispatch = useDispatch();
	const isLocalLoading = useSelector(selectIsLoadingUser);
	const serverError = useSelector(selectErrorUser);
	const user = useSelector(selectUser);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		dispatch(thunkAuth(`/register`, setUser, setIsLoadingUser, setErrorUser, { login, password }));
	};

	const formError = errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (isLocalLoading) {
		return <Loader />;
	}

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
					{...register('login', { onChange: () => dispatch(setErrorUser(null)) })}
					style={{ width: '60%', margin: ' 0 auto 10px' }}
				/>
				<Input
					type="password"
					placeholder="Password..."
					{...register('password', { onChange: () => dispatch(setErrorUser(null)) })}
					style={{ width: '60%', margin: ' 0 auto 10px' }}
				/>
				<Input
					type="password"
					placeholder="Repeat password..."
					{...register('passcheck', { onChange: () => dispatch(setErrorUser(null)) })}
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
