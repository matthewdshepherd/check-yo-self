var toDoArray = []

// QUERY SELECTORS
var aside = document.querySelector('.aside');
var asideIdeas = document.querySelector('.form__div-idea-input');
var main = document.querySelector('.main')


// EVENT LISTENERS
aside.addEventListener('click', function () {
  event.preventDefault();
  if (event.target.closest('.form__section-img')) {
    addInitialItems();
  }
  if (event.target.closest('.make')) {
    makeTaskList(event);
  }
})


function addTitleToCard(title, taskItems) {
  console.log('title: ', title)
  main.insertAdjacentHTML(
    'afterbegin',
    `<article class="todo-card">
      <h3 class="todo-card__h3" >${title.value}</h3>
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
  clearInput(title)
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

function makeTaskList(event) {
  var itemsFromAside = getItemsFromAside(event);
  var asideTitleInput = document.querySelector('.form__input');
  var asideIdeaList = document.querySelector('.form__div-idea-input')
  var asideItemsInHtml = makeAsideItemHtml(itemsFromAside)
  addTitleToCard(asideTitleInput, asideItemsInHtml);
  asideIdeaList.innerHTML = '';
}

function makeAsideItemHtml(arrayOfItems) {
  var createdHtmlArray = []
  for (var i = 0; i < arrayOfItems.length; i++) {
    createdHtmlArray.push(`<div class="todo-card-item__div">
        <img class="todo-card-item__div__img image" src="images/checkbox.svg" alt="unchecked todo checkbox">
          <p class="todo-card-item__div__p">${arrayOfItems[i]}</p>
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



function clearInput(input) {
  input.value = '';
}