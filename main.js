// Global Array
var toDoArray = JSON.parse(localStorage.getItem('toDoObj')) || []

// QUERY SELECTORS
var searchBox = document.querySelector('.header__section-text');
var aside = document.querySelector('.aside');
var asideIdeas = document.querySelector('.form__div-idea-input');
var asideTitleInput = document.querySelector('.form__input');
var asideTasks = document.querySelector('.form__div-idea-input')
// var tasksArray = document.querySelectorAll('.container1')
var addTask = document.querySelector(".form__section-img")
var make = document.querySelector(".make")
var clear = document.querySelector(".clear")
var filter = document.querySelector(".filter")
var taskInput = document.querySelector('.form__section-input')
var main = document.querySelector('.main')
var paragraph = document.querySelector('.prompt-idea')

// Functions on page load
reassignClass();
persist();
promptIdea();
checkFilterBtn();

// EVENT LISTENERS
filter.addEventListener('click', urgencyFilterBtn)
searchBox.addEventListener('keyup', searchFilter)
aside.addEventListener('keydown', function () {
  if (event.keyCode === 13) {
      event.preventDefault();
      addTask.click();
    }
    enableasideButtons()
  });

aside.addEventListener('click', function () {
  event.preventDefault();
  if (event.target.closest('.form__section-img')) {
    addItemsToAside(taskInput);
    clearInput(taskInput);
    enableasideButtons()
    disableButtons(addTask);
  };

  if (event.target.closest('.make')) {
    clearInput(taskInput);
    newToDo(event);
    promptIdea()
    disableButtons(make);
    disableButtons(clear);
    disableButtons(addTask);
  };

  if (event.target.closest('.clear')) {
    clearInput(taskInput);
    clearInput(asideTitleInput);
    asideTasks.innerHTML = '';
    disableButtons(clear);
    disableButtons(make);
    disableButtons(addTask);
  };

  if (event.target.closest('.form__container-img')) {
    event.target.closest('.container1').remove()
    if (document.querySelectorAll('.container1').length === 0) {
      disableButtons(make)
    }
  };
})

main.addEventListener('click', function () {
  if (event.target.closest('.delete-image')) {
   deleteCard(event);
  }
  if (event.target.closest('.todo-card-item__div__img')) {
    checkItem(event);
  }
  if (event.target.closest('.urgent-image')) {
    makeUrgent(event);
  }
})

function newToDo(event) {
  var toDoObj = new ToDoList(Date.now(), asideTitleInput.value);
  toDoArray.push(toDoObj);
  pushItemsIntoToDoObj(event, toDoObj);
  createTaskCard(event, toDoObj)
  toDoObj.saveToStorage(toDoArray);
  promptIdea();
};

function remakeNewIdea(id, title, urgent, tasks, tasksString) {
  var tempTasks = tasks
  var toDoObj = new ToDoList(id, title, urgent, tasks, tasksString);
  toDoObj.tasks = tempTasks;
  return toDoObj
};

function reassignClass() {
  var tempArray = []
  toDoArray.forEach(function (toDoObj) {
    tempArray.push(remakeNewIdea(toDoObj.id, toDoObj.title, toDoObj.urgent, toDoObj.tasks, toDoObj.tasksString));
  });
  toDoArray = tempArray;
};

function createTaskCard(event, toDoObj) {
  appendToDoCard(toDoObj, makeAsideItemHtml(event));
  clearInput(asideTitleInput);
  document.querySelector('.form__div-idea-input').innerHTML = ''
};

function pushItemsIntoToDoObj(event, toDoObj) {
  var arrayOfItems = getItemsFromAside(event);
  var arrayOfItemID = getIDfromAside(event);
  for (var i = 0; i < arrayOfItems.length; i++) {
    toDoObj.tasks.push({ check: false, item: arrayOfItems[i], id: arrayOfItemID[i]})
  }
  toDoObj.tasksString = arrayOfItems.join(' ').toLowerCase();
};

function getItemsFromAside(event) {
  var items = event.target.previousElementSibling.previousElementSibling.previousElementSibling.children;
  var tempArray = [];
  for (var i = 0; i < items.length; i++) {
    tempArray.push(items[i].innerText)
  }
  return tempArray
};

function getIDfromAside(event) {
  var items = event.target.previousElementSibling.previousElementSibling.previousElementSibling.children;
  var tempArray = [];
  for (var i = 0; i < items.length; i++) {
    tempArray.push(items[i].dataset.id)
  }
  return tempArray
};

function addItemsToAside() {
  asideIdeas.insertAdjacentHTML(
    'beforeend',
    `<container class="form__container container1" data-id="${Date.now()}">
    <input type="image" class="form__container-img image" src="images/delete.svg" alt="delete task item button">
    <p class="form__container-p" >${taskInput.value}</p>
    </container>`
    );
};

function makeAsideItemHtml(event) {
  var itemsFromAside = getItemsFromAside(event);
  var arrayOfItemID = getIDfromAside(event);
  var createdHtmlArray = []
  for (var i = 0; i < itemsFromAside.length; i++) {
    createdHtmlArray.push(`<div class="todo-card-item__div" data-id="${arrayOfItemID[i]}">
        <input type="image" class="todo-card-item__div__img image" src="images/checkbox.svg" alt="unchecked todo checkbox">
          <p class="todo-card-item__div__p">${itemsFromAside[i]}</p>
          </div>`)
  }
  return createdHtmlArray.join(' ')
};

function appendToDoCard(toDoObj, taskItems) {
  main.insertAdjacentHTML(
    'afterbegin',
    `<article class="todo-card" ${urgentStyleColor(toDoObj)} data-id="${toDoObj.id}">
      <h3 class="todo-card__h3" >${toDoObj.title}</h3>
      <div class="todo-card__div-sperator1 div-sperator" ${urgentStyleDiv(toDoObj)}></div>
      ${taskItems}
      <div class="todo-card__div-sperator2 div-sperator" ${urgentStyleDiv(toDoObj)}></div>
      <container class="todo-card-footer__container">
        <div class="todo-card-footer__container__div">
          <input type="image" class="todo-card-footer__container__div1__img urgent-image image" ${toDoObj.urgent ? `src="images/urgent-active.svg"` : `src = "images/urgent.svg"`} alt="unactive image urgent status">
            <p class="todo-card-footer__container__div urgent">URGENT</p>
        </div>
        <div class="todo-card-footer__container__div">
          <input type="image" class="todo-card-footer__container__div2__img delete-image image" src = ${checkForDeleteButton(toDoObj)} alt="unactive delete button" disabled>
          <p class="todo-card-footer__container__div delete" >DELETE</p>
        </div>
      </container>
    </article>`
  )
};

function clearInput(input) {
  input.value = '';
};

function persist() {
  toDoArray.forEach(function (toDoObj) {
    var reappendTasks = makeTaskString(toDoObj);
    appendToDoCard(toDoObj, reappendTasks);
    enableDeleteVerificationOnPageLoad(toDoObj);
  })
};

function makeTaskString(toDoObj) {
  var toDoObjTasksArray = toDoObj.tasks;
  var createdHtmlArray = [];
  var unchecked = `images/checkbox.svg`;
  var checked = `images/checkbox-active.svg`;
  var checkedText = `style = "color: #3c6577; font-style: italic;"`
  var image;
  for (var i = 0; i < toDoObjTasksArray.length; i++) {
    toDoObjTasksArray[i].check ? (image = checked, textUpdate = checkedText): (image = unchecked, textUpdate = '')

    createdHtmlArray.push(`<div class="todo-card-item__div" data-id="${toDoObjTasksArray[i].id}">
        <input type="image" class="todo-card-item__div__img image" src="${image}" alt="unchecked todo checkbox">
          <p class="todo-card-item__div__p" ${textUpdate}>${toDoObjTasksArray[i].item}</p>
          </div>`)
  }
  return createdHtmlArray.join(' ')
};

function enableasideButtons() {
  if (asideTitleInput.value !== '' || taskInput.value !== '' || asideTasks.innerHTML !== '') {
    clear.disabled = false;
  }
  var tasksArray = document.querySelectorAll('.container1')
  if (asideTitleInput.value !== '' && tasksArray.length > 0) {
    make.disabled = false;
  }
  if (taskInput.value !== '') {
    addTask.disabled = false;
  }
};

function disableButtons (button) {
  button.disabled = true;
};

function deleteCard(event) {
  var cardIndex = findIndex(event);
  if (event.target.closest('.delete-image')) {
    event.target.closest('.todo-card').remove();
    toDoArray[cardIndex].deleteFromStorage(cardIndex);
  }
};

function findID(event) {
  var container = event.target.closest('.todo-card');
  if (toDoArray.length > 0 && container) {
    return parseInt(event.target.closest('.todo-card').dataset.id);
  }
};

function findIndex(event) {
  var id = findID(event);
  for (var i = 0; i < toDoArray.length; i++) {
    if (id === toDoArray[i].id) {
      return parseInt(i);
    }
  }
};

function checkItem(event) {
  var itemIndex = findItemIndex(event)
  var cardIndex = findIndex(event);
  toDoArray[cardIndex].tasks[itemIndex].check ? (toDoArray[cardIndex].tasks[itemIndex].check = false, event.target.src = 'images/checkbox.svg', event.target.nextElementSibling.removeAttribute('style')) : (toDoArray[cardIndex].tasks[itemIndex].check = true, event.target.src = 'images/checkbox-active.svg', event.target.nextElementSibling.setAttribute('style', 'color: #3c6577; font-style: italic;'))

  toDoArray[cardIndex].saveToStorage(toDoArray);
  enableDeleteVerification(event);
};

function makeUrgent(event) {
  var cardIndex = findIndex(event);
  toDoArray[cardIndex].updateToDo(event, cardIndex);
  checkFilterBtn();
};

function checkFilterBtn() {
  var urgentCounts = toDoArray.filter(function(toDoObj) {
    return toDoObj.urgent === true
  })
    if (urgentCounts.length > 0) {
      filter.disabled = false;
    } else {
      filter.disabled = true;
    }
};
var urgentSearch = 0;
var buttonClicked = 0;
function urgencyFilterBtn(event) {
  buttonClicked ? (buttonClicked = 0, event.target.removeAttribute('style'), urgentSearch = 0, searchFilter()) : (buttonClicked = 1, event.target.setAttribute('style', 'background-color: #ef4a23; border: 2px solid #782616;'), urgentSearch = true, searchFilter())
}

function findItemID(event) {
  if (event.target.closest('.todo-card-item__div')) {
    return parseInt(event.target.closest('.todo-card-item__div').dataset.id);
  }
};

function findItemIndex(event) {
  var id = findItemID(event);
  var items = getToDoObjItemsArray(event);
  for (var i = 0; i < items.length; i++) {
    if (id === items[i]) {
      return parseInt(i);
    }
  }
};

function getToDoObjItemsArray(event) {
  var cardIndex = findIndex(event);
  var toDoObj = toDoArray[cardIndex];
  var toDoObjTasks = toDoObj.tasks
  var arrayOfItemIDs = getArrayOfItemIDs(toDoObjTasks)
  return arrayOfItemIDs
};

function getArrayOfItemIDs(toDoObjTasks) {
  var arrayOfItemIDs = []
  for (var i = 0; i < toDoObjTasks.length; i++) {
    arrayOfItemIDs.push(parseInt(toDoObjTasks[i].id))
  }
  return arrayOfItemIDs
};

function enableDeleteVerification(event) {
  var cardIndex = findIndex(event);
  var taskArray = toDoArray[cardIndex].tasks
  var trueCounter = 0
  taskArray.forEach(function (item) {
    if (item.check === true) {
      trueCounter += 1
    }
  })
  var deleteElementIndex = event.target.parentElement.parentElement.children.length -1
  var deleteElementSrc = event.target.parentElement.parentElement.children[deleteElementIndex].children[1].children[0]
  trueCounter === taskArray.length ? (deleteElementSrc.disabled = false, deleteElementSrc.src = 'images/delete-active.svg') : (deleteElementSrc.disabled = true, deleteElementSrc.src = 'images/delete.svg')
};

function enableDeleteVerificationOnPageLoad(toDoObj) {
  var taskArray = toDoObj.tasks;
  var trueCounter = 0
  taskArray.forEach(function (item) {
    if (item.check === true) {
      trueCounter += 1
    }
  })
  trueCounter === taskArray.length ? (document.querySelector('.delete-image').disabled = false) : (document.querySelector('.delete-image').disabled = true)
};

function checkForDeleteButton(toDoObj) {
  var taskArray = toDoObj.tasks;
  var trueCounter = 0
  var img;
  taskArray.forEach(function (item) {
    if (item.check === true) {
      trueCounter += 1
    }
  })
  trueCounter === taskArray.length ? (img = "images/delete-active.svg") : (img = "images/delete.svg")
  return img
}

function urgentStyleColor(toDoObj) {
  var style;
  toDoObj.urgent ? (style = `style="background-color: #ffe89d; border: 2px solid #ffc30c;"`) : (style ='')
  return style
}

function urgentStyleDiv(toDoObj) {
  var style;
  toDoObj.urgent ? (style = `style = "background-color: #ffc30c;"`) : (style = '')
  return style
}

function searchFilter() {
  var search = searchBox.value.toLowerCase();
  var results = toDoArray.filter(function (toDoObj) {
    return (
      ((toDoObj.title.toLowerCase().includes(search) ||
        toDoObj.tasksString.includes(search)) && (toDoObj.urgent === urgentSearch || urgentSearch === 0))
    );
  });
  main.innerHTML = '';
  results.forEach(function (toDoObj) {
    appendToDoCard(toDoObj, makeTaskString(toDoObj));
  });
}

function promptIdea() {
  if (toDoArray.length === 0) {
    paragraph.classList.remove('hidden');
  } else if (toDoArray.length !== 0) {
    paragraph.classList.add('hidden');
  }
}