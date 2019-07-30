class ToDoList {
  constructor(id, title, urgent, tasks) {
    this.id = id,
    this.title = title;
    this.urgent = urgent || false;
    this.tasks = tasks || []
  }

  // methods
  saveToStorage(toDoArray) {
    localStorage.setItem('toDoObj', 
      JSON.stringify(toDoArray));
  }

  deleteFromStorage(cardIndex) {
    toDoArray.splice(cardIndex, 1);
    this.saveToStorage(toDoArray);
  }
  // updateToDo(should update the todo’s title and urgency)
  updateToDo(event, cardIndex) {
    // top div
    var topDiv = event.target.parentElement.parentElement.parentElement.children[1]
    var bottomDiv = event.target.parentElement.parentElement.previousElementSibling
   
    toDoArray[cardIndex].urgent ? (toDoArray[cardIndex].urgent = false, (event.target.src = `images/urgent.svg`), event.target.closest('.todo-card').removeAttribute('style'), topDiv.removeAttribute('style'), bottomDiv.removeAttribute('style')) : (toDoArray[cardIndex].urgent = true, (event.target.src = `images/urgent-active.svg`), event.target.closest('.todo-card').setAttribute('style', 'background-color: #ffe89d; border: 2px solid #ffc30c;'), topDiv.setAttribute('style', 'background-color: #ffc30c;'), bottomDiv.setAttribute('style', 'background-color: #ffc30c;'))

    toDoArray[cardIndex].saveToStorage(toDoArray)
  }
  // updateTask(should update a task’s content and if it has been completed)
  updateTask() {

  }

}