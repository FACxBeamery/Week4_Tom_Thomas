const express = require("express");
const fs = require("fs");
const path = require("path");
const formidable = require("express-formidable");
const logic = require("../logic.js");

express().use(formidable());

const editItem = (req, res) => {
    const toDoFilePath = path.join(__dirname, "..", "..", "/data/todo.json");
    fs.readFile(toDoFilePath, (error, file) => {
        if (error) {
            console.error(error.message);
            res.status(404).end();
        } else {
            const oldToDoListJS = JSON.parse(file);
            console.log("oldToDoListJS: ", oldToDoListJS);

            const itemToEditId = Number(req.params.id);
            const itemToEdit = oldToDoListJS.find(
                item => item.id === itemToEditId
            );
            console.log("itemToEdit: ", itemToEdit);
            const itemToEditIndex = oldToDoListJS.findIndex(
                item => item === itemToEdit
            );
            console.log("itemToEditIndex: ", itemToEditIndex);

            const dateNow = Date.now();
            newToDoListJS = [...oldToDoListJS];
            newToDoListJS[itemToEditIndex] = logic.editItemOnList(
                req.fields,
                itemToEdit,
                dateNow
            );

            console.log("newToDoListJS: ", newToDoListJS);

            const newToDoListJSON = JSON.stringify(newToDoListJS);
            fs.writeFile(toDoFilePath, newToDoListJSON, error => {
                if (error) {
                    console.error(error.message);
                    res.status(404).end();
                } else {
                    res.status(201).end();
                }
            });
        }
    });
};

module.exports = editItem;