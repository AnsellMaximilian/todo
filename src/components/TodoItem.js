import React from 'react';

class TodoItem extends React.Component {
    render(){
        const {title, important, daily, completed} = this.props.details;
        return(
            
            <div className="todo-item">
                <button>{completed ? "Done" : "Nope"}</button>
                <span>{title}</span>
                <button>{important ? "!" : "Chill"}</button>
                <span>{daily ? "Daily" : "Whatever"}</span>

            </div>
        )
    }
}

export default TodoItem;