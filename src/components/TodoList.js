import React from 'react';

import TodoItem from './TodoItem';

class TodoList extends React.Component {
    render(){
        const todoItemComponents = this.props.todoItems.map((todo, index) => {
            return <TodoItem details={todo} key={index} deleteTodo={this.props.deleteTodo} toggleCompleteTodo={this.props.toggleCompleteTodo}/>
        })
        return(
            <div>
                {todoItemComponents}
            </div>
        )
    }
}

export default TodoList;