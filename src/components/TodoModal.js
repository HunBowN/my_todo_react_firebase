import React, { useState } from 'react'

const TodoModal = ({todo, modalVisible, setModalVisible }) => {
    
  return (
    modalVisible &&
        <div className="col">
          <h2> {todo.title} </h2>
          { todo.file? <a href={todo.file}>Cкачать вложение</a> : null }
          <p>{todo.description}</p>
          <p>{todo.time ? 'Expiration date: ' + todo.time : null}</p>
          <p className='timeIsOver'>{todo.timeEnd ? 'Time is over!' : null }</p>
          <button onClick={() => setModalVisible(false)}>Close</button>
        </div>
    
  )
}

export default TodoModal