const path = require("path");

const getItems = (req, res) => {
	const toDoFile = path.join(__dirname, "..", "/data/todo.json");
	const sortBy = req.query.sortBy;

	if (sortBy === "none") {
		res.sendFile(toDoFile);
	} else {
		fs.readFile(toDoFile, (error, file) => {
			if (error) {
				console.error(error.message);
			} else {
				const toDo = JSON.parse(file);
				if (sortBy === "dateCreated" || sortBy === "dateEdited") {
					res.send(sortArray(toDo, sortBy));
				} else {
					console.error(`${sortBy} is not a valid sorting method.`);
				}
			}
		});
	}
};
