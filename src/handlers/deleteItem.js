const fs = require("fs");
const path = require("path");
const logic = require("../logic.js");

const deleteItem = (req, res) => {
    const toDoFilePath = path.join(__dirname, "..", "..", "/data/todo.json");
    fs.readFile(toDoFilePath, (error, file) => {
        if (error) {
            console.error(error.message);
            res.status(404).end();
        } else {
            const toDoList = JSON.parse(file);
            console.log("req.params: ", req.params);
            const id = Number(req.params.id);
            if (!logic.validID(toDoList, id)) {
                console.error("Invalid id supplied");
                res.status(404).end();
                return;
            }
            const newToDoList = JSON.stringify(
                logic.removeItemByID(toDoList, id)
            );
            console.log("newToDoList: ", newToDoList);
            if (newToDoList === "error") {
                res.status(404).end();
                return;
            }
            fs.writeFile(toDoFilePath, newToDoList, error => {
                if (error) {
                    console.error(error.message);
                    res.status(404).end();
                } else {
                    res.status(204).end();
                }
            });
        }
    });
};

module.exports = deleteItem;
