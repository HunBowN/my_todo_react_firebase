import React, { useState } from 'react';
import './App.css'
import AddTodo from './components/AddTodo';
import Header from './components/Header';
import Todos from './components/Todos';




function App() {

  const [todo, setTodo] = useState([

  ])

  return (
    <div className="App">
     
      <Header />
      <AddTodo  todo = {todo} setTodo={setTodo} />
      <Todos todo = {todo} setTodo = {setTodo} />
      
    </div>
    
  )
}

export default App;
