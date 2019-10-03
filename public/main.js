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
    const deleteButton = document.createElement("button");
    const deleteButtonText = document.createTextNode("Delete");
    deleteButton.append(deleteButtonText);
    const id = toDoObj.id;
    const idString = id.toString();
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", idString);
    checkbox.checked = toDoObj.status;
    deleteButton.setAttribute("id", idString + "-delete");
    deleteButton.classList.add("delete-item-button");
    para.appendChild(checkbox);
    para.append(deleteButton);
    document.getElementById("showToDoContainer").appendChild(para);
    addCheckBoxListener(id);
    addDeleteButtonListener(toDoObj.id.toString() + "-delete", toDoObj.title);
};

const addCheckBoxListener = id => {
    const checkbox = document.getElementById(id.toString());
    checkbox.addEventListener("click", () => {
        let xhrEditStatus = new XMLHttpRequest();
        xhrEditStatus.addEventListener("readystatechange", () => {
            if (
                xhrEditStatus.readyState === 4 &&
                xhrEditStatus.status === 201
            ) {
            }
        });
        xhrEditStatus.open("PATCH", `items/${id}`, true);
        xhrEditStatus.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        const body = `status=${checkbox.checked}`;
        xhrEditStatus.send(body);
    });
};

const addDeleteButtonListener = (id, title) => {
    const deleteButton = document.getElementById(id);
    deleteButton.addEventListener("click", () => {
        overlayOn();
        const overlay = document.querySelector(".overlay");
        const para = document.createElement("p");
        const node = document.createTextNode(
            `Are you sure you want to delete the item titled ${title}?`
        );
        para.appendChild(node);
        overlay.appendChild(para);
        const yesButton = document.createElement("button");
        const yesButtonText = document.createTextNode("Yes");
        yesButton.setAttribute("id", "yes-delete-button");
        addYesDeleteButtonListener(id.substring(0, id.indexOf("-")));
        yesButton.appendChild(yesButtonText);
        overlay.appendChild(yesButton);

        const noButton = document.createElement("button");
        const noButtonText = document.createTextNode("No");
        noButton.setAttribute("id", "no-delete-button");
        noButton.appendChild(noButtonText);
        overlay.appendChild(noButton);
        addNoDeleteButtonListener();
    });
};

const addYesDeleteButtonListener = id => {
    const yesButton = document.getElementById("yes-delete-button");
    yesButton.addEventListener("click", () => {
        let xhrDelete = new XMLHttpRequest();
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
