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
    toDoArray[cardIndex].urgent ? (toDoArray[cardIndex].urgent = false, (event.target.src = `images/urgent.svg`)) : (toDoArray[cardIndex].urgent = true, (event.target.src = `images/urgent-active.svg`))

    toDoArray[cardIndex].saveToStorage(toDoArray)
  }
  // updateTask(should update a task’s content and if it has been completed)
  updateTask() {

  }

}