import React from 'react';

class TodoItem extends React.Component {
    handleDelete = () => {
        this.props.deleteTodo(this.props.details.id);
        
    }

    handleToggleComplete = () => {
        this.props.toggleCompleteTodo(this.props.details.id);
    }

    render(){
        const {title, important, daily, completed} = this.props.details;
        return(
            
            <div className="todo-item">
                <button onClick={this.handleToggleComplete}>{completed ? "Done" : "Nope"}</button>
                <span>{title}</span>
                <button>{important ? "!" : "Chill"}</button>
                <span>{daily ? "Daily" : "Whatever"}</span>
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}

export default TodoItem;