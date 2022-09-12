////Zeige das heutige Datum an /////////////
const dateElement = document.querySelector("#date");
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerText = today.toLocaleDateString("de-DE", options);
///////////////////////////////////////////////////

// ist der state der alle todo Daten beinhaltet

let todos = [];
let localStorageIsEmpty = false;

//////// Daten in den Local Storage einfügen/////////////////
function getLocalStorage() {
  if (localStorage.getItem("todos")) {
    const todosInLocalStorage = localStorage.getItem("todos");

    // localstorage Eintrag ist ein String und muss mit Json.parse
    //in ein Objekt verwandelt werden

    return JSON.parse(todosInLocalStorage);
  } else {
    localStorageIsEmpty = true;
    return [];
  }
}

/// function muss ausgeführt werden
todos = getLocalStorage();

///////// todos hinzufügen, pushed die oben deklarierte Todos //////////
function addTodo(text) {
  if (text.length > 3)
    todos.push({
      isDone: false,
      text: text,
      // id: createID(text),
    });
}

//////// hier wrd der Local Storage immer aktualisert ///////////
function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorageIsEmpty = false;
}

//////// Konstante Input feld und das gesamte form Element//////////
const newTodoInputElement = document.querySelector("#input");
const newTodoItemForm = document.querySelector("#add-new-form");

////
newTodoItemForm.addEventListener("submit", function (event) {
  event.preventDefault(); // -> verhindert das neu laden der Seite
  addTodo(newTodoInputElement.value); // -> Wert des Input ausgeben
  updateLocalStorage(); //-> aktualisiert den Local Storage
  render();
  // reset input feld
  newTodoInputElement.value = "";
});

///// deklariert die Konstante der Unsorted List im HTML//////////
const todoListElement = document.querySelector("#list");

function render() {
  // reset
  todoListElement.innerHTML = "";

  // aus dem todos state einzelne todos erzeugen
  for (let todo of todos) {
    // dynamisch li html Elemente erzeugen mit den Daten von todo
    const listItemElement = document.createElement("li");
    listItemElement.innerText = todo.text;

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    // checkboxElement.id = todo.id;

    if (todo.isDone) {
      checkboxElement.checked = true;
    }

    listItemElement.appendChild(checkboxElement);
    todoListElement.appendChild(listItemElement);
  }
}

// todoListElement.addEventListener("change", function (e) {
//   const id = e.target.id;
//   const index = todos.findIndex((todo) => todo.id === id);
//   console.log(index);
//   todos[index].isDone = !todos[index].isDone;
// });

// function createID(str) {
//   return str.trim().replaceAll(" ", "-").toLowerCase();
// }

const removeDoneToDo = document.querySelector("#delete");
render();
