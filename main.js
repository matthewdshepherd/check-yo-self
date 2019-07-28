// Global Array
var toDoArray = JSON.parse(localStorage.getItem('toDoObj')) || []

// QUERY SELECTORS
var aside = document.querySelector('.aside');
var asideIdeas = document.querySelector('.form__div-idea-input');
var asideTitleInput = document.querySelector('.form__input');
var asideTasks = document.querySelector('.form__div-idea-input')
var addTask = document.querySelector(".form__section-img")
var make = document.querySelector(".make")
var clear = document.querySelector(".clear")
var filter = document.querySelector(".filter")
var taskInput = document.querySelector('.form__section-input')
var main = document.querySelector('.main')

// Functions on page load
reassignClass();
persist();

// EVENT LISTENERS
aside.addEventListener('keypress', function () {
  if (event.keyCode === 13) {
      event.preventDefault();
      addTask.click();
    }
    enableasideButtons()
  });

aside.addEventListener('click', function () {
  event.preventDefault();
  if (event.target.closest('.form__section-img')) {
    addInitialItems(taskInput);
    clearInput(taskInput)
    disableButtons(addTask)
  };

  if (event.target.closest('.make')) {
    newToDo(event);
    disableButtons(make)
    disableButtons(clear)
    disableButtons(addTask)
  };

  if (event.target.closest('.clear')) {
    clearInput(taskInput)
    clearInput(asideTitleInput)
    asideTasks.innerHTML = ''
    disableButtons(clear)
    disableButtons(make)
    disableButtons(addTask)
  };

  if (event.target.closest('.form__container-img')) {
    event.target.closest('.container1').remove()
  };
})

// todo - card - item__div__img image

main.addEventListener('click', function () {
 if (event.target.closest('.delete-image')) {
   
 }
})

function newToDo(event) {
  var toDoObj = new ToDoList(Date.now(), asideTitleInput.value);
  toDoArray.push(toDoObj);
  pushItemsIntoToDoObj(getItemsFromAside(event), toDoObj);
  createTaskCard(event, toDoObj)
  toDoObj.saveToStorage(toDoArray);
}

function remakeNewIdea(id, title, urgent, tasks) {
  var tempTasks = tasks
  var toDoObj = new ToDoList(id, title, urgent, tasks);
  toDoObj.tasks = tempTasks;
  return toDoObj
}

function reassignClass() {
  var tempArray = []
  toDoArray.forEach(function (toDoObj) {
    tempArray.push(remakeNewIdea(toDoObj.id, toDoObj.title, toDoObj.urgent, toDoObj.tasks));
  });
  toDoArray = tempArray;
}

function createTaskCard(event, toDoObj) {
  appendToDoCard(toDoObj, makeAsideItemHtml(event));
  clearInput(asideTitleInput);
  document.querySelector('.form__div-idea-input').innerHTML = ''
}

function pushItemsIntoToDoObj(arraOfItems, toDoObj) {
  for (var i = 0; i < arraOfItems.length; i++) {
    toDoObj.tasks.push({ check: false, item: arraOfItems[i]})
  }
}

function getItemsFromAside(event) {
  var items = event.target.previousElementSibling.previousElementSibling.previousElementSibling.children
  var tempArray = []
  for (var i = 0; i < items.length; i++) {
    tempArray.push(items[i].innerText)
  }
  return tempArray
}

function addInitialItems() {
  asideIdeas.insertAdjacentHTML(
    'beforeend',
    `<container class="form__container container1">
    <input type="image" class="form__container-img image" src="images/delete.svg" alt="delete task item button">
    <p class="form__container-p" >${taskInput.value}</p>
    </container>`
    );
}

function makeAsideItemHtml(event) {
  var itemsFromAside = getItemsFromAside(event);
  var createdHtmlArray = []
  for (var i = 0; i < itemsFromAside.length; i++) {
    createdHtmlArray.push(`<div class="todo-card-item__div">
        <input type="image" class="todo-card-item__div__img image" src="images/checkbox.svg" alt="unchecked todo checkbox">
          <p class="todo-card-item__div__p">${itemsFromAside[i]}</p>
          </div>`)
  }
  return createdHtmlArray.join(' ')
}

function appendToDoCard(toDoObj, taskItems) {
  main.insertAdjacentHTML(
    'afterbegin',
    `<article class="todo-card" data-id="${toDoObj.id}">
      <h3 class="todo-card__h3" >${toDoObj.title}</h3>
      <div class="todo-card__div-sperator1"></div>
      ${taskItems}
      <div class="todo-card__div-sperator2"></div>
      <container class="todo-card-footer__container">
        <div class="todo-card-footer__container__div">
          <input type="image" class="todo-card-footer__container__div1__img urgent-image image" src="images/urgent.svg" alt="unactive image urgent status">
            <p class="todo-card-footer__container__div urgent">URGENT</p>
        </div>
        <div class="todo-card-footer__container__div">
          <input type="image" class="todo-card-footer__container__div2__img delete-image image" src="images/delete.svg" alt="unactive delete button">
          <p class="todo-card-footer__container__div delete" >DELETE</p>
        </div>
      </container>
    </article>`
  )
}

function clearInput(input) {
  input.value = '';
}

function persist() {
  toDoArray.forEach(function (toDoObj) {
    var reappendTasks = makeTaskString(toDoObj)
    appendToDoCard(toDoObj, reappendTasks)
  })
}
// need to update this function to change image when clicked(toDoObj.check === (false/true))
function makeTaskString(toDoObj) {
  var toDoObjTasksArray = toDoObj.tasks;
  var createdHtmlArray = []
  for (var i = 0; i < toDoObjTasksArray.length; i++) {
    createdHtmlArray.push(`<div class="todo-card-item__div">
        <input type="image" class="todo-card-item__div__img image" src="images/checkbox.svg" alt="unchecked todo checkbox">
          <p class="todo-card-item__div__p">${toDoObjTasksArray[i].item}</p>
          </div>`)
  }
  return createdHtmlArray.join(' ')
}

function enableasideButtons() {
  if (asideTitleInput.value !== '' || taskInput.value !== '' || asideTasks.innerHTML !== '') {
    clear.disabled = false;
  }
  if (asideTitleInput.value !== '' && asideTasks.innerHTML !== '') {
    make.disabled = false;
  }
  if (taskInput.value !== '') {
    addTask.disabled = false;
  }
}

function disableButtons (button) {
  button.disabled = true;
}

// function deleteTaskItem(event) {
//   event.target.classList.remove('form__container-img')
// }
