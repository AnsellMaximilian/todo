import React from 'react';

class TodoItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            notesOpen: false,
            notesInputFocus: false,
            notesInput: this.props.details.notes
        }
    }

    handleDelete = () => {
        this.props.deleteTodo(this.props.details.id);
        
    }

    handleToggleComplete = () => {
        this.props.toggleCompleteTodo(this.props.details.id);
    }

    toggleNotes = () => {
        this.setState(state => ({
            notesOpen: !state.notesOpen
        }))
    }

    handleChange = (e) => {
        this.setState({
            notesInput: e.target.value
        })
    }

    handleNotesClick = (e) => {

        const notesInput = e.target.parentElement.children[1];
        this.setState({notesInputFocus: true}, () => {
            notesInput.focus();
            // Puts cursor on the end of input
            notesInput.setSelectionRange(notesInput.value.length, notesInput.value.length);
        });
    }

    handleBlur = () => {
        this.setState({notesInputFocus: false});
        this.props.updateNotes(this.props.details.id, this.state.notesInput);
    }

    render(){
        const {title, important, daily, completed} = this.props.details;
        return(
            
            <div className="todo-item" style={{fontWeight: important ? "bolder" : "normal"}}>
                <button onClick={this.handleToggleComplete}
                    className={completed ? "fas fa-check checkbox-checked" : "fas fa-check checkbox"}
                ></button>
                <span className="todo-title">{title}{daily ? <i className="fas fa-calendar-alt daily-mark"></i> : null}</span>
                <button className="fas fa-chevron-down open-notes-btn" onClick={this.toggleNotes}></button>
                <button onClick={this.handleDelete} className="delete-todo-btn fas fa-trash"></button>
                <div className="todo-notes" style={{display: this.state.notesOpen ? "block" : "none"}}>
                    <span className="notes-content" style={{display: this.state.notesInputFocus ? "none" : "block"}} onClick={this.handleNotesClick}>
                        {this.state.notesInput}
                    </span>
                    <textarea
                        style={{display: this.state.notesInputFocus ? "block" : "none"}} 
                        autoFocus={true}
                        className="todo-notes-input" 
                        value={this.state.notesInput}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}>
                    </textarea>
                </div>
            </div>
        )
    }
}

export default TodoItem;