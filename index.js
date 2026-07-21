var input = document.getElementById('todo');
var button = document.getElementById('btn');

var list = document.getElementById('todo-list');
var completedList = document.getElementById('completed-list');

var editPopup = document.getElementById("editPopup");
var editInput = document.getElementById("editInput");
var saveEdit = document.getElementById("saveEdit");
var cancelEdit = document.getElementById("cancelEdit");

var saved = localStorage.getItem('todos');
var todos = saved ? JSON.parse(saved) : {};

function savetodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


function createtodonode(todo, id) {

    var li = document.createElement('li');

    
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    
    var textspan = document.createElement("span");
    textspan.textContent = todo.text;
    textspan.style.margin = "0 8px";

    if (todo.completed) {
        textspan.style.textDecoration = "line-through";
    }

    
    var datespan = document.createElement("small");
    datespan.textContent = " (" + todo.date + ")";
    datespan.style.color = "gray";


    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        savetodos();
        render();
    });

    textspan.addEventListener("dblclick", () => {
        editPopup.style.display = "flex";
        editInput.value = todo.text;

       
        saveEdit.onclick = null;

        saveEdit.onclick = () => {
            var newText = editInput.value.trim();

            if (newText === "") return;

            todo.text = newText;
            savetodos();
            render();
            editPopup.style.display = "none";
        };

        cancelEdit.onclick = () => {
            editPopup.style.display = "none";
        };
    });

  

    li.appendChild(checkbox);
    li.appendChild(textspan);
    li.appendChild(datespan);

    return li;
}


function render() {

    list.innerHTML = "";
    completedList.innerHTML = "";

    Object.keys(todos)
    .sort((a, b) => new Date(todos[a].date) - new Date(todos[b].date))
    .forEach((id) => {

        var todo = todos[id];
        var node = createtodonode(todo, id);

        if (todo.completed) {
            completedList.appendChild(node);
        } else {
            list.appendChild(node);
        }
    });
}

function addtodo() {

    var text = input.value.trim();
    if (text === "") return;

    var now = new Date();
    var dateString = now.toLocaleString();

    var id = "id" + Date.now();

    todos[id] = {
        text: text,
        completed: false,
        date: dateString
    };

    input.value = "";

    savetodos();
    render();
}


button.addEventListener("click", addtodo);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addtodo();
    }
});

render();
      
