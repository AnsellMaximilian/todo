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
            
            <div className="todo-item" style={{fontWeight: important ? "bolder" : "normal"}}>
                <button onClick={this.handleToggleComplete}
                    className={completed ? "fas fa-check checkbox-checked" : "fas fa-check checkbox"}
                ></button>
                <span className="todo-title">{title}{daily ? <i className="fas fa-calendar-alt daily-mark"></i> : null}</span>
                <button onClick={this.handleDelete} className="delete-todo-btn fas fa-trash"></button>
            </div>
        )
    }
}

export default TodoItem;