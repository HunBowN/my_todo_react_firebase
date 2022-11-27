import React, { useState } from "react";
import TodoModal from "./TodoModal";

const Todos = ({ todo, setTodo }) => {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [todoForModal, setTodoForModal] = useState({});

  /**
   * Функция удаляющая выбранный todo по соответствующиму id 
   * @param {string} id -  todo's id
   * 
   */

  function deleteTodo(id) {
    let newTodos = [...todo].filter((item) => {
      return item.id !== id;
    });
    setTodo(newTodos);
  }

  /**
   * Функция скняющая статус todo выполнено/ не выполнено для изменения стиля
   * @param {string} id -  todo's id
   */

  function statusTodo(id) {
    let newTodos = [...todo].filter((item) => {
      if (item.id == id) {
        item.status = !item.status;
      }
      return item;
    });
    setTodo(newTodos);
  }

  /**
   * Функуия позволяющая изменять значение выбранного по id todo, устанавлияваю текущий value в качестве значения input
   * @param {string} id - todo's id
   * @param {string} value -todo's сurr value
   */

  function editTodo(id, value) {
    setEdit(id);
    setValue(value);
  }

  /**
   * Функция сохраняющая измененный todo
   * @param {string} id - todo's id
   */

  function saveTodo(id) {
    let newTodo = [...todo].map((item) => {
      if (item.id === id) {
        item.title = value;
      }
      return item;
    });
    setTodo(newTodo);
    setEdit(null);
  }

  /**
   * Функция для выведения выбранного todo в модальном окне для просмотра
   * @param {object} item - объект текущего todo 
   */

  function todoModalInf(item = {}) {
    setModalVisible(true)
    setTodoForModal(item)
  }

  return (
    todo.length > 0 ? (
      <ul className="todo-list">
        {
          <TodoModal
            todo={todoForModal}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        }
        {todo.map((item) => (
          <div key={item.id}>
            {edit === item.id ? (
              <div className="todo">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                ></input>
                <button
                  className="delete-btn"
                  onClick={() => saveTodo(item.id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="todo">
                {item.status ? (
                  <>
                    <li onClick={() => todoModalInf(item)}>{item.title} </li>
                    <button
                      className="delete-btn"
                      onClick={() => statusTodo(item.id)}
                    >
                      Close
                    </button>
                  </>
                ) : (
                  <>
                    <li
                      className="todoClose"
                      onClick={() => setTodoForModal(item)}
                    >
                      {item.title}{" "}
                    </li>
                    <button
                      className="delete-btn"
                      onClick={() => statusTodo(item.id)}
                    >
                      Open
                    </button>
                  </>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(item.id)}
                >
                  Delete
                </button>
                <button
                  className="delete-btn"
                  onClick={() => editTodo(item.id, item.title)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </ul>
    ) : (
      <p>No todos</p>
    )
  );
};

export default Todos;
