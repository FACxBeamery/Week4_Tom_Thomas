const express = require("express");
const getItems = require("./handlers/getItems.js");
const router = express();

router.use(express.static("public"));

router.get("/items", getItems);

// router.post("/items", addItems);

// router.delete("/items/:id(d+)", deleteItem);

// router.patch("/items/:id(d+)", editItem);

module.exports = router;
