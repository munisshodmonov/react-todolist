import React, { useEffect, useState} from 'react';
import './App.css';
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import Typography from "@material-ui/core/Typography";
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  }


const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {
  const [todos, setTodos] = useState([]);

useEffect(() => {
  const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (storageTodos) {
    setTodos(storageTodos);
  }

}, [])

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}, [todos]);

  function addTodo(todo) {
    setTodos([todo, ...todos]);
  }
  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className="App">
      <Particles className='particles'
   params={{particlesOptions}}
          />
      <Typography style={{ padding: 16 }} variant="h1">
        What is your main focus today?
      </Typography>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
