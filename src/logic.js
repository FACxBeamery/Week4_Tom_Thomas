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

module.exports = {
    createItem
};
