import React from 'react';

import TodoItem from './TodoItem';

class TodoList extends React.Component {
    render(){
        const todoItemComponents = this.props.todoItems.map(function(todo, index){
            return <TodoItem details={todo} key={index}/>
        })
        return(
            <div>
                {todoItemComponents}
            </div>
        )
    }
}

export default TodoList;