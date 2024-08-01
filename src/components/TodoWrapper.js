import React, {useState, useEffect} from 'react'
import { TodoForm } from './todoForm'
import { Todo } from './todo'
import { v4 as uuidv4 } from 'uuid'
import { EditTodoForm } from './EditTodoForm'
import {format} from 'date-fns'


export const TodoWrapper = () => {

    const [todos, setTodos] = useState(() => {
        // Load tasks from local storage or return an empty array
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            try {
                // Parse stored JSON data
                const parsedTodos = JSON.parse(storedTodos);
                // Ensure it's an array
                if (Array.isArray(parsedTodos)) {
                    return parsedTodos;
                } else {
                    console.error('Stored todos are not an array:', parsedTodos);
                }
            } catch (error) {
                console.error('Error parsing stored todos:', error);
            }
        }
        // Default to an empty array if no valid data is found
        return [];
    });

    // Adding task to local storage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    

    const addTodo = todo => {
        const timestamp = format(new Date(), 'yyyy-MM-dd');
        setTodos([...todos, {id: uuidv4(), task:todo,
            completed: false, isEditing: false, timestamp: timestamp
        }]);

    }

    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
    }

     const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id ))
     }

     const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
     }

     const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
     }
    
  return (
    <div className='TodoWrapper'>
        <h1>Get Things Done 2.0!</h1>
        <TodoForm  addTodo={addTodo}/>
        {todos.map((todo, index) =>(
            todo.isEditing ? (
                <EditTodoForm  editTodo={editTask} task = {todo}/>
            ) : (
                <Todo task = {todo} key = {index}
                toggleComplete={toggleComplete}
                deleteTodo = {deleteTodo} 
                editTodo={editTodo}/>
            )
            
        ))}
    </div>
  )
}
