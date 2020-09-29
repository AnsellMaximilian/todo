function Todo(title, important, daily){
    this.title = title;
    this.important = important;
    this.daily = daily;
}

Todo.prototype.completed = false;

export default Todo;