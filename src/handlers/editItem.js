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

            const itemToEditId = Number(req.params.id);
            if (!logic.validID(oldToDoListJS, id)) {
                console.error("Invalid item ID supplied");
                res.status(404).end();
                return;
            }

            const itemToEdit = oldToDoListJS.find(
                item => item.id === itemToEditId
            );

            const itemToEditIndex = oldToDoListJS.findIndex(
                item => item === itemToEdit
            );

            const dateNow = Date.now();
            newToDoListJS = [...oldToDoListJS];
            newToDoListJS[itemToEditIndex] = logic.editItemOnList(
                req.fields,
                itemToEdit,
                dateNow
            );

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
