export const generateDate = () => {
	const randomDate = new Date(Math.random() * (1000 * 365 * 24 * 60 * 60 * 1000));
	const [day, month, year, hours, minutes] = [
		randomDate.getDate(),
		randomDate.getMonth() + 1,
		randomDate.getFullYear(),
		randomDate.getHours(),
		randomDate.getMinutes(),
	]
		.map(String)
		.map((s) => s.padStart(2, '0'));

	return `${day}.${month}.${year} ${hours}:${minutes}`;
};
