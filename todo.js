
var nextId = 1;
var tasks = [];

getStoredValues();

function addTask(taskName) {
    
    getStoredValues();
    let newTask = {
        id: nextId++,
        name: taskName,
        done: false
    }

    tasks.push(newTask);
    saveValues();
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
