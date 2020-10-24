import React from 'react';

import TodoItem from './TodoItem';

// CSS
import '../css/todo-list.css';

class TodoList extends React.Component {
    render(){
        const todoItemComponents = this.props.todoItems.map((todo, index) => {
            return <TodoItem 
                details={todo} key={index} 
                deleteTodo={this.props.deleteTodo} 
                toggleCompleteTodo={this.props.toggleCompleteTodo}
                updateNotes={this.props.updateNotes}    
                />
        })
        return(
            <div id="todo-list">
                {todoItemComponents}
            </div>
        )
    }
}

export default TodoList;