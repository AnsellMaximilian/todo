import React from 'react';

//components
import Header from './components/Header';
import TodoContainer from './components/TodoContainer';

import './App.css';


function App() {
  return (
    <div className="App">
      <Header title="Todo"/>
      <TodoContainer />
    </div>
  );
}

export default App;
