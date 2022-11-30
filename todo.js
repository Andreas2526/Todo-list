
var nextId = 1;
var tasks = [];

getStoredValues();

document.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    let clicked = e.target;
    console.log(clicked);
});

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

function addTask() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("todoInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("todoInput").value = "";
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
}
// legger til en task når man trykker på (Add Task) knappen
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}
//viser en x for å lukke tasken
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

//viser check symbol når man trykker på tasken
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('check');
  }
}, false);
