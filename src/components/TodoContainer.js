import React from 'react';
import Todo from '../models/Todo';

import TodoList from './TodoList';
import TodoForm from './TodoForm';

class TodoContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todoItems: [
                new Todo("Swagger", false, false)
            ]
        }
    }

    addTodo = (todo) => {
        const todoItems = this.state.todoItems;
        todoItems.push(new Todo(todo.title, todo.important, todo.daily));
        this.setState({
            todoItems: todoItems,
        })
    }
    render(){
        
        return(
            <div>
                <TodoForm addTodo={this.addTodo}/>
                <TodoList todoItems={this.state.todoItems}/>
            </div>
        )
    }
}

export default TodoContainer;