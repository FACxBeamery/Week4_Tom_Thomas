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
    // para.classList.add("para=class");
};

const addCheckBoxListener = id => {
    const checkbox = document.getElementById(id.toString());
    checkbox.addEventListener("click", () => {
        console.log("checkbox.checked 1: ", checkbox.checked);
        let xhrEditStatus = new XMLHttpRequest();
        xhrEditStatus.addEventListener("readystatechange", () => {
            if (
                xhrEditStatus.readyState === 4 &&
                xhrEditStatus.status === 201
            ) {
                // checkbox.checked = !checkbox.checked;
                console.log("checkbox.value 2: ", checkbox.checked);
            }
        });
        console.log(id, typeof id);
        xhrEditStatus.open("PATCH", `items/${id}`, true);
        xhrEditStatus.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        console.log("checkbox.checked 3: ", checkbox.checked);
        const body = `status=${checkbox.checked}`;
        console.log(body);
        xhrEditStatus.send(body);
        console.log("end:", checkbox.checked);
    });
};
