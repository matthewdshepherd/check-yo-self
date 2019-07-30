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
    // var cardIndex = findIndex(event);
    toDoArray[cardIndex].urgent ? (toDoArray[cardIndex].urgent = false, (event.target.src = `images/urgent.svg`), document.querySelector('.todo-card').removeAttribute('style'), document.querySelector('.todo-card__div-sperator1').removeAttribute('style'), document.querySelector('.todo-card__div-sperator2').removeAttribute('style')) : (toDoArray[cardIndex].urgent = true, (event.target.src = `images/urgent-active.svg`), document.querySelector('.todo-card').setAttribute('style', 'background-color: #ffe89d; border: 2px solid #ffc30c;'),
      document.querySelector('.todo-card__div-sperator1').setAttribute('style', 'background-color: #ffc30c;'),
      document.querySelector('.todo-card__div-sperator2').setAttribute('style', 'background-color: #ffc30c;'))

    toDoArray[cardIndex].saveToStorage(toDoArray)
  }
  // updateTask(should update a task’s content and if it has been completed)
  updateTask() {

  }

}