import React from 'react';
import Todo from '../models/Todo';

// Componenets
import TodoList from './TodoList';
import TodoForm from './TodoForm';

//Database
import db from '../service/database';

class TodoContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todoItems: []
        }
    }

    componentDidMount(){
        // get data
        db.collection('todos').get() 
        .then((result) => {
            const todoItems = result.docs.map((doc) => {
                const {title, important, daily, completed} = doc.data();
                const newTodo = new Todo(doc.id, title, important, daily);
                newTodo.completed = completed;
                return newTodo;
            });
            this.setState({
                todoItems: todoItems
            })
            
        })
    }

    addTodo = (todo) => {
        const todoItems = this.state.todoItems;
        //add todo to firebase
        db.collection('todos').add({
            title: todo.title,
            important: todo.important,
            daily: todo.daily,
            completed: false
        })
        .then((newTodoRef) => {
            todoItems.push(new Todo(newTodoRef.id, todo.title, todo.important, todo.daily));
            this.setState({
                todoItems: todoItems,
            })
        })
        
    }

    deleteTodo = (id) => {
        const todoItems = this.state.todoItems.filter((todo) => {
            return todo.id !== id;
        });
        db.collection('todos').doc(id).delete()
        
        this.setState({
            todoItems: todoItems,
        })
    }

    toggleCompleteTodo = (id) => {
        let completed = false;
        const todoItems = this.state.todoItems.map(todo => {
            if(todo.id === id){
                todo.completed = !todo.completed;
                completed = todo.completed;
                return todo;
            }
            return todo;
        })
        db.collection('todos').doc(id).update({completed: completed})
        .then(function(){console.log("NIGGER", id)})
        .catch(function(){console.log("FAGG")});
        this.setState({
            todoItems: todoItems,
        })
    }
    render(){
        
        return(
            <div>
                <TodoForm 
                    addTodo={this.addTodo}
                />
                <TodoList todoItems={this.state.todoItems}
                    deleteTodo={this.deleteTodo}
                    toggleCompleteTodo={this.toggleCompleteTodo}
                />
            </div>
        )
    }
}

export default TodoContainer;