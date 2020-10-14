import React from 'react';

// CSS
import '../css/todo-tools.css';

class TodoTools extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hidden: true
        }
    }

    toggleVisibility = () => {
        this.setState(state => ({
            hidden: !state.hidden
        }))
    }

    render(){
        return(
            <div id="todo-tools" className={this.state.hidden ? "" : "toggle-visible"}>
                <button className="fas fa-bars" id="tools-toggle" onClick={this.toggleVisibility}></button>
                <div className="todo-tool" onClick={this.props.getAllTasks}>All Tasks</div>
                <div className="todo-tool" onClick={this.props.getDailyTasks}>Daily Tasks</div>
                <div className="todo-tool" onClick={this.props.getImportantTasks}>Important Tasks</div>
                <div className="todo-tool" onClick={this.props.getCompletedTasks}>Completed Tasks</div>
            </div>
        )
    }
}

export default TodoTools;