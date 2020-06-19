
let tasks = [];

function renderEditor() {
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input");

   
    let addTask = () => {
        if (inputEl.value.length === 0) {
            return;
        }
        let newTask = {
            title: inputEl.value,
            done: false,
        };

        inputEl.value = "";
        tasks.push(newTask);
        console.log("tasks:", tasks);
        renderTaskItems();


    };

    inputEl.onkeypress = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    }
    let addEl = document.querySelector("#default-todo-panel .todo-editor >  button");
    addEl.onclick = (e) => {
        addTask();
    };
}

function renderTaskItems() {
    let itemsE1 = document.querySelector("#default-todo-panel .todo-items");

    itemsE1.querySelectorAll("div").forEach((node) => node.remove());
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let itemE1 = document.createElement("div");
        itemE1.className = "task";

        let doneE1 = document.createElement("input");
        doneE1.type = "checkbox";
        doneE1.checked = task.done;

        doneE1.onchange = (e) => {
            task.done = e.target.checked;
            if (task.done) {
                itemE1.classList.add("done");
            } else {
                itemE1.classList.remove("done");
            }
        }
        itemE1.append(doneE1);

        let titleE1 = document.createElement("label");
        titleE1.innerText = task.title;
        itemE1.append(titleE1);


        let ctrlbarE1 = document.createElement("div");
        ctrlbarE1.className = "ctrlbar";



        let upE1 = document.createElement("button");
        upE1.innerText = "↑";
        ctrlbarE1.append(upE1);
        upE1.onclick = () => {

            if (i === 0) {
                alert("已经是第一个不能在向上排序");
                return;
            }
            else {
                let paixu = [];
                paixu[i] = tasks[i];
                tasks[i] = tasks[i - 1];
                tasks[i - 1] = paixu[i];
                renderTaskItems();
            }
        };




        let downE1 = document.createElement("button");
        downE1.innerText = "↓";
        ctrlbarE1.append(downE1);
        downE1.onclick = () => {

            if (i === tasks.length-1) {
                alert("已经是最后一个不能在向下排序");
                return;
            }

            else {
                let paixu = [];
                paixu[i] = tasks[i];
                tasks[i] = tasks[i + 1];
                tasks[i + 1] = paixu[i];
                renderTaskItems();
            }


        };


        let importE1 = document.createElement("button");
        importE1.innerText = "☆";
        ctrlbarE1.append(importE1);
        importE1.onclick = () => {
        
        if  ( importE1.innerText === "☆"){
        importE1.innerText = "★";
        
                itemE1.classList.add("import");
            
            }
    
        else  { importE1.innerText = "☆";
        itemE1.classList.remove("import");}

        }




        let cancelE1 = document.createElement("button");
        cancelE1.innerText = "x";
        cancelE1.onclick = () => {
            tasks.splice(i, 1);
            renderTaskItems();
        };

        ctrlbarE1.append(cancelE1);

        itemE1.append(ctrlbarE1);

        itemsE1.append(itemE1);

    }
}
renderEditor();
renderTaskItems();