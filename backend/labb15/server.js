const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const todos = require('./todos');
const fs = require('fs');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());

// will fetch 5 todos
app.post('/api/getTodos', (req, res) => {
  const number = req.body.page * 5;
  try {
    let fiveTodos = [];
    for (let i = number; i < number + 5; i++) {
      if (todos[i]) {
        fiveTodos.push(todos[i]);
      };
    }
    res.send({todos: fiveTodos, length: todos.length});
  } catch (err) {
    console.log(err);
  };
});

app.post('/api/todos', (req, res) => {
  todos.push(req.body);
  const data = JSON.stringify(todos);
  fs.writeFileSync(path.join(__dirname, '/todos.json'), data);
  res.end();
});

// update a todos complete status
app.put('/api/todos', (req, res) => {
  updatedTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === req.body.id) {
      todos[i].completed = !todos[i].completed;
      updatedTodos.push(todos[i]);
    } else {
      updatedTodos.push(todos[i]);
    };
  };
  const data = JSON.stringify(updatedTodos);
  fs.writeFileSync(path.join(__dirname, '/todos.json'), data);
  res.end();
});

app.delete('/api/todos', (req, res) => {
  updatedTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id !== req.body.id) {
      updatedTodos.push(todos[i]);
    };
  };
  const data = JSON.stringify(updatedTodos);
  fs.writeFileSync(path.join(__dirname, '/todos.json'), data);
  res.end();
});

app.listen(PORT, () =>{
  console.log(`Server running on port: ${PORT}.`);
});
