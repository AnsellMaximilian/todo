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

    // Tools methods
    getAllTasks = () => {
        const currentUser = auth.currentUser;
        db.collection('todos').where('user', '==', currentUser.uid).orderBy('important', 'desc').get() 
        .then((result) => {
            const todoItems = result.docs.map((doc) => {
                const {title, important, daily, completed} = doc.data();
                const newTodo = new Todo(doc.id, title, important, daily);
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
        this.filterTasks('daily', true);
    }

    getImportantTasks = () => {
        this.filterTasks('important', true);
    }
    
    getCompletedTasks = () => {
        this.filterTasks('completed', true);
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
    filterTasks = (att, value) => {
        const currentUser = auth.currentUser;
        db.collection('todos').where('user', '==', currentUser.uid).where(att, "==", value).get()
        .then(result => {
            const todoItems = result.docs.map((doc) => {
                const {title, important, daily, completed} = doc.data();
                const newTodo = new Todo(doc.id, title, important, daily);
                newTodo.completed = completed;
                return newTodo;
            });
            this.setState({
                todoItems: todoItems,
                filterMode: att
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
                    resetDailyTasks={this.resetDailyTasks}
                    filterMode={this.state.filterMode}
                />
                <TodoList todoItems={this.state.todoItems}
                    deleteTodo={this.deleteTodo}
                    toggleCompleteTodo={this.toggleCompleteTodo}
                />
            </div>
        )
    }
}

export default TodoContainer;