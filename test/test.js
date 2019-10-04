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

test("Testing whether createItem() generates a new to-do", t => {
	const reqfields = { title: "title of new to-do" };
	const dateNow = 1570010627648;
	const actual = logic.createItem(reqfields, dateNow);
	const expected = {
		title: "title of new to-do",
		status: false,
		id: 1570010627648,
		dateCreated: "Wed, 02 Oct 2019 10:03:47 GMT",
		dateEdited: "Wed, 02 Oct 2019 10:03:47 GMT",
	};
	t.deepEqual(
		actual,
		expected,
		"createItem() should generate a new to-do with a user-given title, an id, a status, a date created and a date edited."
	);
	t.end();
});

test("Testing whether editItemOnList() edits a to-do.", t => {
	const reqfields = { title: "changed title", status: "true" };
	const oldItem = {
		title: "title of new to-do",
		status: false,
		id: 1570010627648,
		dateCreated: "Wed, 02 Oct 2019 10:03:47 GMT",
		dateEdited: "Wed, 02 Oct 2019 10:03:47 GMT",
	};
	const dateNow = 1570010627648;
	const actual = logic.editItemOnList(reqfields, oldItem, dateNow);
	const expected = {
		title: "changed title",
		status: true,
		id: 1570010627648,
		dateCreated: "Wed, 02 Oct 2019 10:03:47 GMT",
		dateEdited: "Wed, 02 Oct 2019 10:03:47 GMT",
	};
	t.equal(actual.title, expected.title, "editItemOnList() should change the title of the old to-do fed into it.");
	t.equal(actual.status, expected.status, "editItemOnList() should change the status of the old to-do fed into it.");
	t.end();
});

test("Testing sortArray by status", t => {
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
			status: true,
			id: 1570020902067,
			dateCreated: "Wed, 02 Oct 2019 12:55:02 GMT",
			dateEdited: "Wed, 02 Oct 2019 12:55:02 GMT",
		},
	];
	const sortBy = "status";
	const actual = logic.sortArray(arr, sortBy);
	const expected = [
		{
			title: "Thomas to do",
			status: false,
			id: 1570010624961,
			dateCreated: "Wed, 02 Oct 2019 10:03:44 GMT",
			dateEdited: "Wed, 02 Oct 2019 10:03:44 GMT",
		},
		{
			title: "a new todo item",
			status: true,
			id: 1570020902067,
			dateCreated: "Wed, 02 Oct 2019 12:55:02 GMT",
			dateEdited: "Wed, 02 Oct 2019 12:55:02 GMT",
		},
	];
	t.deepEqual(actual, expected, "sortArray(arr, status) should return a new array sorted by the status property.");
	t.end();
});
