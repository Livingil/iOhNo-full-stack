import PropTypes from 'prop-types';

export const IconSky = ({ weatherSky }) => {
	let sky;

	switch (weatherSky) {
		case 500:
		case 501:
		case 502:
		case 503:
		case 504:
			sky = '10d';
			break;
		case 511:
		case 601:
		case 602:
		case 611:
		case 612:
		case 613:
		case 615:
		case 616:
		case 620:
		case 621:
		case 622:
			sky = '13d';
			break;
		case 200:
		case 201:
		case 202:
		case 210:
		case 211:
		case 212:
		case 221:
		case 230:
		case 231:
		case 232:
			sky = '11d';
			break;
		case 300:
		case 301:
		case 302:
		case 310:
		case 311:
		case 312:
		case 313:
		case 314:
		case 321:
		case 520:
		case 521:
		case 522:
		case 531:
			sky = '09d';
			break;
		case 700:
		case 711:
		case 721:
		case 731:
		case 741:
		case 751:
		case 761:
		case 762:
		case 771:
		case 781:
			sky = '50d';
			break;
		case 800:
			sky = '01d';
			break;
		case 801:
			sky = '02d';
			break;
		case 802:
			sky = '03d';
			break;
		case 803:
		case 804:
			sky = '04d';
			break;

		default:
			null;
	}
	return (
		<img src={`https://openweathermap.org/img/wn/${sky}@2x.png`} alt="Состояние неба" style={{ width: '80px' }} />
	);
};

IconSky.propTypes = { weatherSky: PropTypes.number.isRequired };
