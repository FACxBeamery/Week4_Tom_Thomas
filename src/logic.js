const createItem = reqBodyObj => {
    // reqBodyObj stands in for req.fields
    let newItem = {};

    newItem.title = reqBodyObj.title;

    if (reqBodyObj.status) {
        newItem.status = reqBodyObj.status;
    } else {
        newItem.status = false;
    }

    newItem.id = Date.now();
    const dateNow = new Date();
    newItem.dateCreated = dateNow.toUTCString();
    newItem.dateEdited = dateNow.toUTCString();

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

module.exports = { sortArray, createItem };

