import { useNavigate } from 'react-router-dom';

export const useClickUrl = (adres) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(adres);
	};
	return handleClick;
};
