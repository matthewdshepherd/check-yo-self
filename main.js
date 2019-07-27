var toDoArray = []

// QUERY SELECTORS
var aside = document.querySelector('.aside');
var asideIdeas = document.querySelector('.form__div-idea-input');


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
  var itemsFromAside = getItemsFromAside(event)
  
  console.log(itemsFromAside)
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