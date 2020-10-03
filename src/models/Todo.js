function Todo(id, title, important, daily){
    this.id = id;
    this.title = title;
    this.important = important;
    this.daily = daily;
}

Todo.prototype.completed = false;

export default Todo;