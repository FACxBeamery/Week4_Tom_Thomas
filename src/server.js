const express = require("express");
const formidable = require("express-formidable");
const router = require("./router.js");

const app = express();
//const port = process.env.PORT || 3000;
const port = 5500;
app.use(formidable());

app.use(router);

app.listen(port, () => {
	console.log(`Server listening on port ${port}. Ready to accept requests!`);
});
