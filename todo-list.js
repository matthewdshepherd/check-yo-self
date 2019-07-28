class ToDoList {
  constructor(id, title, urgent, tasks) {
    this.id = id,
    this.title = title;
    this.urgent = urgent || false;
    this.tasks = []
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
  updateToDo() {

  }
  // updateTask(should update a task’s content and if it has been completed)
  updateTask() {

  }

}