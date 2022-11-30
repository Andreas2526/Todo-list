
var nextId = 1;
var tasks = [];

init(true);

document.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    let clicked = e.target;
    console.log(clicked);
});

function init(setFocus = false) {
    document.getElementById("tasklist").textContent = '';
    getStoredValues();
    tasks.forEach(item => {
        createListItem(item.name, item.id, item.done);
    });
    setCounter();
    if (setFocus) {
        document.getElementById("todoInput").focus();
    }
}

function addTask() {
    var inputValue = document.getElementById("todoInput").value;
    if (inputValue === '') {
        alert("Task name is empty!");
        return;
    }
    getStoredValues();
    let newTask = {
        id: nextId++,
        name: inputValue,
        done: false
    }

    tasks.push(newTask);
    saveValues();
    createListItem(newTask.name, newTask.id, newTask.done);
    document.getElementById("todoInput").value = "";
    setCounter();
}

function getStoredValues() {
    
    let id = localStorage.getItem('nextId');
    if (id === null) {
        nextId = 1;
    } else {
        nextId = parseInt(id);
    }
    
    let items = localStorage.getItem('tasks');
    if (items === null) {
        items = [];
    } else {
        items = JSON.parse(items);
    }
    tasks = items;
}

function saveValues() {
    localStorage.setItem('nextId', nextId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createListItem(taskname, taskId, checked) {
    var li = document.createElement("li");
    li.setAttribute("onclick","setChecked(event, " + taskId +")")
    var t = document.createTextNode(taskname);
    if (checked) {
        li.setAttribute("class", "check")
    }
    li.appendChild(t);
    document.getElementById("tasklist").appendChild(li);
    
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.setAttribute("onclick", "deleteTask(" + taskId + ")");
    li.appendChild(span);
}

function setChecked(ev, taskid) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('check');
    }
    getStoredValues();
    tasks.forEach(item => {
        if (item.id === taskid) {
            item.done = !item.done;
        }
    });
    saveValues();
    setCounter();
}

function deleteTask(id) {
    getStoredValues();
    tasks.forEach(item => {
        if (item.id === id) {
            var index = tasks.indexOf(item);
            if (index !== -1) {
                tasks.splice(index, 1);
            }
        }
    });
    saveValues();
    init();
}

function setCounter() {
    var length = tasks.length;
    var done = tasks.filter(item => item.done === true).length;
    var textnode = document.getElementById('counter');
    var newText = done + " of " + length + " is done";
    if (length === 0) {
        textnode.innerText = '';
    } else {
        textnode.innerText = newText;    
    }

}