function Todo(id, title, important, daily, notes){
    this.id = id;
    this.title = title;
    this.important = important;
    this.daily = daily;
    this.notes = notes;
}

Todo.prototype.completed = false;

export default Todo;