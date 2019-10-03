const express = require("express");
const fs = require("fs");
const path = require("path");
const formidable = require("express-formidable");
const logic = require("../logic.js");

express().use(formidable());

const addItems = (req, res) => {
	const toDoFilePath = path.join(__dirname, "..", "..", "/data/todo.json");
	fs.readFile(toDoFilePath, (error, file) => {
		if (error) {
			console.error(error.message);
			res.status(404).end();
		} else {
			const shorterToDoListJS = JSON.parse(file);
			const dateNow = Date.now();
			const newItem = logic.createItem(req.fields, dateNow);
			shorterToDoListJS.push(newItem);
			const longerToDoListJSON = JSON.stringify(shorterToDoListJS);
			fs.writeFile(toDoFilePath, longerToDoListJSON, error => {
				if (error) {
					console.error(error.message);
					res.status(404).end();
				} else {
					res.status(201).end();
				}
			});
			res.redirect(302, "/");
		}
	});
};

module.exports = addItems;
