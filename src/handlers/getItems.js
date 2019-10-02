const path = require("path");
const fs = require("fs");
const logic = require("../logic.js");

const getItems = (req, res) => {
	const toDoFile = path.join(__dirname, "..", "..", "/data/todo.json");
	const sortBy = req.query.sortBy;

	if (sortBy === "none") {
		res.sendFile(toDoFile);
	} else {
		fs.readFile(toDoFile, (error, file) => {
			if (error) {
				console.error(error.message);
			} else {
				const toDo = JSON.parse(file);
				if (["dateCreated", "dateEdited", "status"].includes(sortBy)) {
					res.send(logic.sortArray(toDo, sortBy));
				} else {
					console.error(`${sortBy} is not a valid sorting method. Please try again.`);
					res.status(400).end();
				}
			}
		});
	}
};

module.exports = getItems;
