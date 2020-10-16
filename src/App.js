import React from 'react';

//components
import Header from './components/Header';
import TodoContainer from './components/TodoContainer';

import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userLoggedIn: false, // user logged in state, controlled at header, where sign up, login buttons are at
    }
  }

  updateAuthStatus = (value) => {
    this.setState({userLoggedIn: value})
  }
  
  render(){
    return (
      <div className="App">
        <Header title="Todo" updateAuthStatus={this.updateAuthStatus} userLoggedIn={this.state.userLoggedIn}/>
        {this.state.userLoggedIn ? <TodoContainer /> : <h2>Please Sign Up Or Login</h2>}
      </div>
    );
  }
  
}

export default App;
