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
                <button onClick={this.handleToggleComplete}
                    className={completed ? "fas fa-check-square" : "fas fa-square"}
                ></button>
                <span>{title}</span>
                <button className={important ? "fas fa-exclamation-circle" : "fas fa-circle"}></button>
                <span>{daily ? "Daily" : "Whatever"}</span>
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}

export default TodoItem;