export const logoName = (adresName) => {
	if (adresName !== '/') {
		const newWordsName = adresName.slice(1).replaceAll('/', ' ').split(' ').slice(0, 2).join(' ');
		const newAdresName = newWordsName[0].toUpperCase() + newWordsName.slice(1);
		return newAdresName;
	}
	return;
};
