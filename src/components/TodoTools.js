import React from 'react';

// CSS
import '../css/todo-tools.css';

class TodoTools extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hidden: true,
        }
    }

    toggleVisibility = () => {
        this.setState(state => ({
            hidden: !state.hidden
        }))
    }

    resetDailyTasks = (e) => {
        e.stopPropagation();
        this.props.resetDailyTasks();
    }

    render(){
        return(
            <div id="todo-tools" className={this.state.hidden ? "" : "toggle-visible"}>
                <button className="fas fa-bars" id="tools-toggle" onClick={this.toggleVisibility}></button>
                <div className={`todo-tool ${this.props.filterMode === 'all' ? 'filter' : ''}`} onClick={this.props.getAllTasks}>All Tasks</div>
                <div className={`todo-tool ${this.props.filterMode === 'daily' ? 'filter' : ''}`} onClick={this.props.getDailyTasks}>Daily Tasks <i title="Reset" className="fas fa-undo-alt extra-tool" onClick={this.resetDailyTasks}></i></div>
                <div className={`todo-tool ${this.props.filterMode === 'important' ? 'filter' : ''}`} onClick={this.props.getImportantTasks}>Important Tasks</div>
                <div className={`todo-tool ${this.props.filterMode === 'completed' ? 'filter' : ''}`} onClick={this.props.getCompletedTasks}>Completed Tasks</div>
                <div className={`todo-tool ${this.props.filterMode === 'uncompleted' ? 'filter' : ''}`} onClick={this.props.getUncompletedTasks}>Uncompleted Tasks</div>
            </div>
        )
    }
}

export default TodoTools;