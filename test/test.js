const test = require("tape");
const logic = require("../src/logic.js");

test("Testing Tape is working", t => {
	t.equal(1, 1, "One should equal one");
	t.end();
});

test("Testing sortArray by dateCreated", t => {
	const arr = [
		{
			title: "Thomas to do",
			status: false,
			id: 1570010624961,
			dateCreated: "Wed, 02 Oct 2019 10:03:44 GMT",
			dateEdited: "Wed, 02 Oct 2019 10:03:44 GMT",
		},
		{
			title: "a new todo item",
			status: false,
			id: 1570020902067,
			dateCreated: "Wed, 02 Oct 2019 12:55:02 GMT",
			dateEdited: "Wed, 02 Oct 2019 12:55:02 GMT",
		},
	];
	const sortBy = "dateCreated";
	const actual = logic.sortArray(arr, sortBy);
	const expected = [
		{
			title: "a new todo item",
			status: false,
			id: 1570020902067,
			dateCreated: "Wed, 02 Oct 2019 12:55:02 GMT",
			dateEdited: "Wed, 02 Oct 2019 12:55:02 GMT",
		},
		{
			title: "Thomas to do",
			status: false,
			id: 1570010624961,
			dateCreated: "Wed, 02 Oct 2019 10:03:44 GMT",
			dateEdited: "Wed, 02 Oct 2019 10:03:44 GMT",
		},
	];
	t.deepEqual(
		actual,
		expected,
		"sortArray(arr, dateCreated) should return a new array sorted by the dateCreated property."
	);
	t.end();
});

test("Testing that removeItemByID works", t => {
	const arr = [
		{
			title: "Thomas to do",
			status: false,
			id: 1570010624961,
			dateCreated: "Wed, 02 Oct 2019 10:03:44 GMT",
			dateEdited: "Wed, 02 Oct 2019 10:03:44 GMT",
		},
		{
			title: "a new todo item",
			status: false,
			id: 1570020902067,
			dateCreated: "Wed, 02 Oct 2019 12:55:02 GMT",
			dateEdited: "Wed, 02 Oct 2019 12:55:02 GMT",
		},
	];
	const id = 1570020902067;
	const actual = logic.removeItemByID(arr, id);
	const expected = [
		{
			title: "Thomas to do",
			status: false,
			id: 1570010624961,
			dateCreated: "Wed, 02 Oct 2019 10:03:44 GMT",
			dateEdited: "Wed, 02 Oct 2019 10:03:44 GMT",
		},
	];
	t.deepEqual(actual, expected, "removeItemByID should remove the item with the corresponding ID from the array.");
	t.end();
});
