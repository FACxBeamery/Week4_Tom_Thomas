const test = require("tape");
const logic = require("../src/logic.js");

test("Testing Tape is working", t => {
	t.equal(1, 1, "One should equal one");
	t.end();
});

test("Testing sortArray by dateCreated", t => {
	const arr = [
		{
			title: "take dog for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:18:29 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:18:29 GMT",
		},
		{
			title: "take chinchilla for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:18:32 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:18:32 GMT",
		},
	];
	const sortBy = "dateCreated";
	const actual = logic.sortArray(arr, sortBy);
	const expected = [
		{
			title: "take chinchilla for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:18:32 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:18:32 GMT",
		},
		{
			title: "take dog for walk",
			status: false,
			dateCreated: "Fri, 27 Sep 2019 08:18:29 GMT",
			dateEdited: "Fri, 27 Sep 2019 08:18:29 GMT",
		},
	];
	t.deepEqual(
		actual,
		expected,
		"sortArray(arr, dateCreated) should return a new array sorted by the dateCreated property."
	);
	t.end();
});
