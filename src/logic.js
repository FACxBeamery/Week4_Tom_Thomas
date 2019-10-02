const createItem = (reqBodyObj, dateInMS) => {
	// reqBodyObj stands in for req.fields
	let newItem = {};

	newItem.title = reqBodyObj.title;

	if (reqBodyObj.status) {
		newItem.status = reqBodyObj.status;
	} else {
		newItem.status = false;
	}

	newItem.id = dateInMS;
	newItem.dateCreated = new Date(dateInMS).toUTCString();
	newItem.dateEdited = new Date(dateInMS).toUTCString();

	return newItem;
};

const sortArray = (arr, sortMethod) => {
	let newArr = [...arr];

	newArr.sort((a, b) => {
		const dateA = new Date(a[sortMethod]);
		const dateB = new Date(b[sortMethod]);
		return dateB - dateA;
	});

	return newArr;
};

const removeItemByID = (arr, idNum) => arr.filter(item => item.id !== idNum);

const validID = (arr, idNum) => Boolean(arr.filter(item => item.id === idNum).length);

module.exports = { sortArray, createItem, removeItemByID, validID };
