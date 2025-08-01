export const timeNow = () => {
	const date = new Date();

	const formatTime = (date) => {
		const hours = date.getHours();
		const minutes = date.getMinutes();

		const formatted = (item) => item.toString().padStart(2, '0');

		return `${formatted(hours)}:${formatted(minutes)}`;
	};
	return formatTime(date);
};
