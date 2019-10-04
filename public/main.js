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

document.getElementById("sortBy").addEventListener("change", event => {
    const sortMethod = event.target.value;
    const toDoContainer = document.getElementById("showToDoContainer");

    while (toDoContainer.firstChild) {
        // clear nodelist
        toDoContainer.removeChild(toDoContainer.firstChild);
    }

    document.getElementById("sortBy").value = "";

    // const options = document.getElementById("sortBy").options;
    // console.log("options: ", options);

    // for (let i = 0; i < options.length; i++) {
    //     options[i].selected = false;
    // }

    let xhrSort = new XMLHttpRequest();

    xhrSort.addEventListener("readystatechange", () => {
        if (xhrSort.readyState === 4 && xhrSort.status === 200) {
            let outputToDoSort = JSON.parse(xhrSort.responseText);

            console.log(outputToDoSort);

            for (let i = 0; i < outputToDoSort.length; i++) {
                addItemToList(outputToDoSort[i]);
            }
        }
    });

    xhrSort.open("GET", `/items?sortBy=${sortMethod}`, true);
    xhrSort.send();
});

const addItemToList = toDoObj => {
    const title = toDoObj.title;
    const id = toDoObj.id;
    const idString = id.toString();
    const para = document.createElement("p");
    para.classList.add("todo-item");
    const node = document.createTextNode(title);
    para.appendChild(node);
    const checkbox = document.createElement("input");
    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash");
    deleteButton.appendChild(deleteIcon);
    deleteButton.style.padding = "0.5rem";
    const editButton = document.createElement("button");
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa", "fa-pencil");
    editButton.appendChild(editIcon);
    editButton.style.padding = "0.5rem";
    editButton.setAttribute("id", idString + "-edit");
    editButton.classList.add("edit-item-button");

    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", idString);
    checkbox.checked = toDoObj.status;
    deleteButton.setAttribute("id", idString + "-delete");
    deleteButton.classList.add("delete-item-button");
    para.appendChild(checkbox);
    para.appendChild(deleteButton);
    para.appendChild(editButton);
    document.getElementById("showToDoContainer").appendChild(para);
    addCheckBoxListener(id);
    addEditItemListener(toDoObj);
    addDeleteButtonListener(toDoObj.id.toString() + "-delete", toDoObj.title);
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
    document
        .getElementById("edit-submit-button")
        .addEventListener("click", event => {
            let xhrEditTitle = new XMLHttpRequest();

            xhrEditTitle.addEventListener("readystatechange", () => {
                if (
                    xhrEditTitle.readyState === 4 &&
                    xhrEditTitle.status === 200
                ) {
                    document
                        .getElementById("edit-submit-button")
                        .addEventListener("click", () => {
                            overlay.style.display = "none";
                        });
                }
            });

            xhrEditTitle.open("PATCH", `items/${toDoObject.id}`, true);
            xhrEditTitle.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
            const body = `title=${inputNode.value}`;
            xhrEditTitle.send(body);
        });
};

const addCheckBoxListener = id => {
    const checkbox = document.getElementById(id.toString());
    checkbox.addEventListener("click", () => {
        let xhrEditStatus = new XMLHttpRequest();
        xhrEditStatus.open("PATCH", `items/${id}`, true);
        xhrEditStatus.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        const body = `status=${checkbox.checked}`;
        console.log("body: ", body);
        xhrEditStatus.send(body);
    });
};

const addDeleteButtonListener = (id, title) => {
    const deleteButton = document.getElementById(id);
    deleteButton.addEventListener("click", () => {
        overlayOn();
        const overlay = document.querySelector(".overlay");
        const para = document.createElement("p");
        para.classList.add("confirm-text");
        const node = document.createTextNode(
            `Are you sure you want to delete the item titled "${title}"?`
        );
        para.appendChild(node);
        overlay.appendChild(para);

        const yesButton = document.createElement("button");
        yesButton.classList.add("yes-delete-button");
        const yesButtonText = document.createTextNode("Yes");
        yesButton.appendChild(yesButtonText);
        yesButton.setAttribute("id", "yes-delete-button");
        para.appendChild(yesButton);

        const noButton = document.createElement("button");
        noButton.classList.add("no-delete-button");
        const noButtonText = document.createTextNode("No");
        noButton.setAttribute("id", "no-delete-button");
        noButton.appendChild(noButtonText);
        para.appendChild(noButton);

        addYesDeleteButtonListener(id.substring(0, id.indexOf("-")));
        addNoDeleteButtonListener();
    });
};

const addYesDeleteButtonListener = id => {
    const yesButton = document.getElementById("yes-delete-button");
    yesButton.addEventListener("click", () => {
        let xhrDelete = new XMLHttpRequest();

        xhrDelete.addEventListener("readystatechange", () => {
            if (
                xhrDelete.readyState ===
                4 /*&&
                xhrDelete.status === 200*/
            ) {
                // add confirmation text here!
                location.reload();
            }
        });

        xhrDelete.open("DELETE", `items/${id}`, true);
        xhrDelete.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        xhrDelete.send();
    });
};

const addNoDeleteButtonListener = () => {
    const noButton = document.getElementById("no-delete-button");
    const overlay = document.querySelector(".overlay");
    noButton.addEventListener("click", () => {
        overlay.style.display = "none";
    });
};
