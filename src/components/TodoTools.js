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
                <div className="todo-tool">Tester</div>
                <div className="todo-tool">Tester</div>
                
            </div>
        )
    }
}

export default TodoTools;