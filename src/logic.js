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

const editItemOnList = (reqBodyObj, itemToEdit, dateInMS) => {
    let editedItem = {};

    editedItem.id = itemToEdit.id;
    editedItem.dateCreated = itemToEdit.dateCreated;
    if (reqBodyObj.title) {
        editedItem.title = reqBodyObj.title;
    } else {
        editedItem.title = itemToEdit.title;
    }
    if (reqBodyObj.status) {
        editedItem.status = reqBodyObj.status === "true";
    } else {
        editedItem.status = itemToEdit.status;
    }
    editedItem.dateEdited = new Date(dateInMS).toUTCString();

    return editedItem;
};

const sortArray = (arr, sortMethod) => {
    let newArr = [...arr];
    if (["dateEdited", "dateCreated"].includes(sortMethod)) {
        newArr.sort((a, b) => {
            const dateA = new Date(a[sortMethod]);
            const dateB = new Date(b[sortMethod]);
            return dateB - dateA;
        });
    } else if (sortMethod === "status") {
        const incomplete = newArr.filter(item => item.status === false);
        const complete = newArr.filter(item => item.status === true);
        return incomplete.concat(complete);
    }

    return newArr;
};

const removeItemByID = (arr, idNum) => arr.filter(item => item.id !== idNum);

const validID = (arr, idNum) =>
    Boolean(arr.filter(item => item.id === idNum).length);

module.exports = {
    sortArray,
    createItem,
    removeItemByID,
    validID,
    editItemOnList
};
