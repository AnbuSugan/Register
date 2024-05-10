import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';

function Home() {
    const [todos, setTodos] = useState([]);
    const [editTodo, setEditTodo] = useState({ _id: null, task: '' });
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get(`http://localhost:3001/get`)
            .then(result => setTodos(result.data))
            
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        const updatedTodo = todos.find(todo => todo._id === id);
        setEditTodo(updatedTodo);
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:3001/update/${editTodo._id}`, editTodo)
            .then(result => {
                console.log(result);
                fetchTodos();  
                setEditTodo({ _id: null, task: '' });  
            })
            .catch(err => console.log(err.response.data));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(result => {
                fetchTodos(); 
            })
            .catch(err => console.log(err));
    };
    const handleOverallDelete = () => {
        axios.delete('http://localhost:3001/deleteAll')
            .then(result => {
                fetchTodos();  
            })
            .catch(err => console.log(err));
    };
    const handleLogout = () => {
        localStorage.removeItem('userId');
        axios.post('http://localhost:3001/logout')
            .then(() => { 
                window.location.href = '/login'; 
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <button className="logoutBtn" onClick={handleLogout}>Logout</button>
            
            <h2>Todo List</h2>
            <Create fetchTodos={fetchTodos} />
            <button  className="deleteBtn" onClick={handleOverallDelete}> Delete All</button>
            {todos.length === 0 ? (
                <div>
                    <h2>No Record</h2>
                </div>
            ) : (
                todos.map(todo => (
                    <div className='task' key={todo._id}>
                        <div>
                            <input type='checkbox' onClick={() => handleEdit(todo._id)} />
                            <button>Edit</button>
                        </div>
                        {editTodo._id === todo._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editTodo.task}
                                    onChange={(e) => setEditTodo({ ...editTodo, task: e.target.value })}
                                />
                                <button onClick={handleUpdate}>Update</button>
                            </div>
                        ) : (
                            <span>{todo.task}</span>
                        )}
                        <div onClick={() => handleDelete(todo._id)}>
                            <button>Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
