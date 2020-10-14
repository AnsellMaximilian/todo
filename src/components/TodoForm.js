import React from 'react';

import '../css/todo-form.css';

class TodoForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            important: false,
            daily: false,
        }
    }

    handleChange = (e) => {
        if(e.target.type !== "button"){ // handles text inputs
            this.setState({title: e.target.value});
        }else{
            this.setState({[e.target.name]: !this.state[e.target.name]})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state);
        this.setState({
            title: "",
            important: false,
            daily: false,
        })
    }
    render(){
        const {title, important, daily} = this.state;
        return(
            <div id="todo-form">
                <label htmlFor="title" id="title-input-container">
                    <input id="title" name="title" type="text" placeholder="Enter Todo Title" value={title} onChange={this.handleChange}/>
                </label>
                

                <button id="important-form-btn" name="important" type="button" 
                    onClick={this.handleChange} 
                    className={important ? "fas fa-exclamation" : ""}
                    title={important ? "Mark un-important" : "Mark important"}
                ></button>

                <button id="daily-form-btn" name="daily" type="button" 
                    onClick={this.handleChange}
                    className={daily ? "fas fa-calendar-alt" : "fas fa-calendar-times"}
                    title={daily ? "Unmark as Daily" : "Mark as daily" }
                ></button>

                <button type="submit" id="todo-submit" onClick={this.handleSubmit}>ADD</button>
            </div>
        )
    }
}

export default TodoForm;