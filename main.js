// Global Array
var toDoArray = []

// QUERY SELECTORS
var aside = document.querySelector('.aside');
var asideIdeas = document.querySelector('.form__div-idea-input');
var asideTitleInput = document.querySelector('.form__input');
var main = document.querySelector('.main')


// EVENT LISTENERS
aside.addEventListener('click', function () {
  event.preventDefault();
  if (event.target.closest('.form__section-img')) {
    addInitialItems();
  }
  if (event.target.closest('.make')) {
    newToDo(event);
  }
})

function newToDo(event) {
  var toDoObj = new ToDoList(Date.now(), asideTitleInput.value);
  toDoArray.push(toDoObj);
  // toDo.saveToStorage(toDoArray);
  createTaskCard(event, toDoObj)
  console.log('function newToDo', toDoObj)
}

function createTaskCard(event, toDoObj) {
  var asideItemsInHtml = makeAsideItemHtml(event)
  appendToDoCard(toDoObj, asideItemsInHtml);
  pushItemsIntoToDoObj(getItemsFromAside(event), toDoObj);
  clearInput(asideTitleInput, toDoObj);
  document.querySelector('.form__div-idea-input').innerHTML = ''
  console.log('function createTaskCard', toDoObj)
}

function pushItemsIntoToDoObj(arraOfItems, toDoObj) {
  for (var i = 0; i < arraOfItems.length; i++) {
    toDoObj.tasks.push(`{ check: false, item: ${arraOfItems[i]}}`)
  }
}

function makeAsideItemHtml(event) {
  var itemsFromAside = getItemsFromAside(event);
  var createdHtmlArray = []
  for (var i = 0; i < itemsFromAside.length; i++) {
    createdHtmlArray.push(`<div class="todo-card-item__div">
        <img class="todo-card-item__div__img image" src="images/checkbox.svg" alt="unchecked todo checkbox">
          <p class="todo-card-item__div__p">${itemsFromAside[i]}</p>
          </div>`)
  }
  return createdHtmlArray.join(' ')
}

function getItemsFromAside(event) {
  var items = event.target.previousElementSibling.previousElementSibling.previousElementSibling.children
  var tempArray = []
  for (var i = 0; i < items.length; i++) {
    tempArray.push(items[i].innerText)
  }
  return tempArray
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
          <img class="todo-card-footer__container__div1__img urgent-image image" src="images/urgent.svg" alt="unactive image urgent status">
            <p class="todo-card-footer__container__div urgent">URGENT</p>
        </div>
        <div class="todo-card-footer__container__div">
          <img class="todo-card-footer__container__div2__img delete-image image" src="images/delete.svg" alt="unactive delete button">
          <p class="todo-card-footer__container__div delete" >DELETE</p>
        </div>
      </container>
    </article>`
  )

}

function addInitialItems() {
  var asideIdeaInput = document.querySelector('.form__section-input')
  asideIdeas.insertAdjacentHTML(
    'beforeend',
    `<container class="form__container container1">
    <input type="image" class="form__container-img image" src="images/delete.svg" alt="delete task item button">
    <p class="form__container-p" >${asideIdeaInput.value}</p>
    </container>`
    );
  var taskInput = document.querySelector('.form__section-input')
  clearInput(taskInput)
}

function clearInput(input) {
  input.value = '';
}