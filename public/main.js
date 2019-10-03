window.addEventListener("load", () => {
	let xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let outputToDo = JSON.parse(xhr.responseText);

			console.log(outputToDo);

			for (let i = 0; i < outputToDo.length; i++) {
				addItemToList(outputToDo[i]);
			}
		}
	});

	xhr.open("GET", "/items?sortBy=none", true);
	xhr.send();
});

const addItemToList = toDoObj => {
	const title = toDoObj.title;
	const para = document.createElement("p");
	const node = document.createTextNode(title);
	para.appendChild(node);
	const checkbox = document.createElement("input");
	const id = toDoObj.id;
	const idString = id.toString();
	checkbox.setAttribute("type", "checkbox");
	checkbox.setAttribute("id", idString);
	checkbox.checked = toDoObj.status;
	para.appendChild(checkbox);
	document.getElementById("showToDoContainer").appendChild(para);
	addCheckBoxListener(id);
	editButton = document.createElement("button");
	editButton.setAttribute("id", idString + "-edit");
	editButton.classList.add("edit-item-button");
	editIcon = document.createElement("i");
	editIcon.classList.add("fa", "fa-pencil");
	editButton.appendChild(editIcon);
	para.appendChild(editButton);
	addEditItemListener(toDoObj);
	// para.classList.add("para=class");
};

const addEditItemListener = toDoObject => {
	button = document.getElementById(toDoObject.id.toString() + "-edit");
	button.addEventListener("click", () => {
		overlayOn();
		createEditBox(toDoObject);
	});
};

const overlayOn = () => {
	overlay = document.querySelector(".overlay");
	overlay.style.display = "block";
};

const createEditBox = toDoObject => {
	const overlay = document.querySelector(".overlay");
	const formNode = document.createElement("form");
	formNode.class = "form-inline";
	const inputNode = document.createElement("input");
	inputNode.type = "text";
	inputNode.classList.add("edit-form");
	const editSubmitButton = document.createElement("button");
	editSubmitButton.setAttribute("id", "edit-submit-button");
	editSubmitButton.classList.add("submit-edited-item-button");
	editSubmitButtonText = document.createTextNode("Submit");
	editSubmitButton.appendChild(editSubmitButtonText);
	formNode.appendChild(editSubmitButton);
	formNode.appendChild(inputNode);
	overlay.appendChild(formNode);
	inputNode.value = toDoObject.title;
	document.getElementById("edit-submit-button").addEventListener("click", event => {
		event.preventDefault();
		const xhrEditTitle = new XMLHttpRequest();
		xhrEditTitle.open("PATCH", `items/${toDoObject.id}`, true);
		xhrEditTitle.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		const body = `title=${inputNode.value}`;
		xhrEditTitle.send(body);
	});
};

const addCheckBoxListener = id => {
	const checkbox = document.getElementById(id.toString());
	checkbox.addEventListener("click", () => {
		console.log("checkbox.checked 1: ", checkbox.checked);
		let xhrEditStatus = new XMLHttpRequest();
		xhrEditStatus.addEventListener("readystatechange", () => {
			if (xhrEditStatus.readyState === 4 && xhrEditStatus.status === 201) {
				// checkbox.checked = !checkbox.checked;
				console.log("checkbox.value 2: ", checkbox.checked);
			}
		});
		console.log(id, typeof id);
		xhrEditStatus.open("PATCH", `items/${id}`, true);
		xhrEditStatus.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		console.log("checkbox.checked 3: ", checkbox.checked);
		const body = `status=${checkbox.checked}`;
		console.log(body);
		xhrEditStatus.send(body);
		console.log("end:", checkbox.checked);
	});
};
