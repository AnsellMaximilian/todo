import React from 'react';
import Todo from '../models/Todo';

// Componenets
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import TodoTools from './TodoTools';

//Database
import {auth, db} from '../service/firebase';

// CSS
import '../css/todo-container.css';

class TodoContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todoItems: [],
            filterMode: 'all'
        }
    }

    componentDidMount(){
        // get data
        this.getAllTasks();
    }

    addTodo = (todo) => {
        const currentUser = auth.currentUser;
        const todoItems = this.state.todoItems;
        //add todo to firebase
        db.collection('todos').add({
            user: currentUser.uid,
            title: todo.title,
            important: todo.important,
            daily: todo.daily,
            completed: false
        })
        .then((newTodoRef) => {
            todoItems.push(new Todo(newTodoRef.id, todo.title, todo.important, todo.daily));
            this.setState({
                todoItems: todoItems,
            })
        })
        
    }

    deleteTodo = (id) => {
        const todoItems = this.state.todoItems.filter((todo) => {
            return todo.id !== id;
        });
        db.collection('todos').doc(id).delete()
        
        this.setState({
            todoItems: todoItems,
        })
    }

    toggleCompleteTodo = (id) => {
        let completed = false;
        const todoItems = this.state.todoItems.map(todo => {
            if(todo.id === id){
                todo.completed = !todo.completed;
                completed = todo.completed;
                return todo;
            }
            return todo;
        })
        db.collection('todos').doc(id).update({completed: completed})
        .then(function(){console.log(`Document with id ${id} updated`)})
        .catch(function(){console.log("Oops, something went wrong!")});
        this.setState({
            todoItems: todoItems,
        })
    }

    updateNotes = (id, notes) => {
        db.collection('todos').doc(id).update({notes: notes})
        .then(() => {
            // this.filterTasks(this.state.filterMode, true)
        })
    }

    // Tools methods
    getAllTasks = () => {
        const currentUser = auth.currentUser;
        db.collection('todos').where('user', '==', currentUser.uid).orderBy('completed', 'asc').orderBy('important', 'desc').get() 
        .then((result) => {
            const todoItems = result.docs.map((doc) => {
                const {title, important, daily, completed, notes} = doc.data();
                const newTodo = new Todo(doc.id, title, important, daily, notes);
                newTodo.completed = completed;
                return newTodo;
            });
            this.setState({
                todoItems: todoItems,
                filterMode: 'all'
            })
        })
    }

    getDailyTasks = () => {
        this.filterTasks('daily', true, 'daily');
    }

    getImportantTasks = () => {
        this.filterTasks('important', true, 'important');
    }
    
    getCompletedTasks = () => {
        this.filterTasks('completed', true, 'completed');
    }

    getUncompletedTasks = () => {
        this.filterTasks('completed', false, 'uncompleted');
    }


    //Reset Daily Tasks
    resetDailyTasks = () => {
        const currentUser = auth.currentUser;
        db.collection('todos').where('user', '==', currentUser.uid).where('daily', "==", true).get()
        .then(result => {
            let batch = db.batch();
            result.forEach(doc => {
                const todoRef = db.collection('todos').doc(doc.id);
                batch.update(todoRef, {completed: false});
            })
            batch.commit().then(() => {
                console.log("Update Completed");
                this.getDailyTasks();
            })
        })
    }

    // Set todos in state by value of attribute
    filterTasks = (att, value, filterMode) => {
        const currentUser = auth.currentUser;
        db.collection('todos').where('user', '==', currentUser.uid).where(att, "==", value).get()
        .then(result => {
            const todoItems = result.docs.map((doc) => {
                const {title, important, daily, completed, notes} = doc.data();
                const newTodo = new Todo(doc.id, title, important, daily, notes);
                newTodo.completed = completed;
                return newTodo;
            });
            this.setState({
                todoItems: todoItems,
                filterMode: filterMode
            })
        })
    }

    render(){
        
        return(
            <div id="todo-container">
                <TodoForm addTodo={this.addTodo}/>
                <TodoTools 
                    getDailyTasks={this.getDailyTasks}
                    getAllTasks={this.getAllTasks}
                    getImportantTasks={this.getImportantTasks}
                    getCompletedTasks={this.getCompletedTasks}
                    getUncompletedTasks={this.getUncompletedTasks}
                    resetDailyTasks={this.resetDailyTasks}
                    filterMode={this.state.filterMode}
                />
                <TodoList todoItems={this.state.todoItems}
                    deleteTodo={this.deleteTodo}
                    toggleCompleteTodo={this.toggleCompleteTodo}
                    updateNotes={this.updateNotes}
                />
            </div>
        )
    }
}

export default TodoContainer;