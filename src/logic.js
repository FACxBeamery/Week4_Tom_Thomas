const sortArray = (arr, sortMethod) => {
	let newArr = [...arr];

	newArr.sort((a, b) => {
		const dateA = new Date(a[sortMethod]);
		const dateB = new Date(b[sortMethod]);
		return dateB - dateA;
	});

	return newArr;
};

module.exports = sortArray;
