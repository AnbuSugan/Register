const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const usersModel = require('./Models/userModel')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

//Register
app.post('/register', (req, res) => {
    const { name, password } = req.body;
    usersModel.create({ name, password })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


//Login

app.post('/login', (req, res) => {
    const { name, password } = req.body;
    usersModel.findOne({ name, password })
        .then(result => {
            if (result) {
                res.json({ message: 'Login successful' });
                
            } else {
                res.json({ message: 'Invalid credentials' });
            }
        })
        .catch(err => res.json(err));
});

app.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});

//Get 
app.get('/get', (req,res)=>{
 
    TodoModel.find()
    
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
//Add
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({  
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

//Update
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const updatedTodo = req.body;

    TodoModel.findByIdAndUpdate(id, updatedTodo, { new: true })
        .then(updated => {
            res.json(updated);
        })
        .catch(err => {
            res.status(400).json({ error: 'Failed to update todo' });
        });
});

//Delete
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
    
})

//delete All
app.delete('/deleteAll', (req, res) => {
    TodoModel.deleteMany({})
        .then(result => res.json({ message: 'All todos deleted successfully' }))
        .catch(err => res.status(500).json({ error: 'Failed to delete todos' }));
});

app.listen(3001,()=>{
    console.log("Server is running")
})
