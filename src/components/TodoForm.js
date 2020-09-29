import React from 'react';

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
    }
    render(){
        const {title, important, daily} = this.state;
        return(
            <div>
                <label htmlFor="title">Title: </label>
                <input id="title" name="title" type="text" placeholder="Let the dogs out, etc." value={title} onChange={this.handleChange}/>

                <button id="important" name="important" type="button" onClick={this.handleChange}>{important ? "!" : "_"}</button>
                <button id="daily" name="daily" type="button" onClick={this.handleChange}>{daily ? "Daily" : "Chill"}</button>

                <button type="submit" onClick={this.handleSubmit}>Add</button>
            </div>
        )
    }
}

export default TodoForm;