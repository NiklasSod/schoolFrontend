import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import todos from './todos.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.static(path.join(__dirname, 'client')));

app.get('/api/todos', (req, res) => {
  try {
    res.send(todos);
  } catch (err) {
    console.log(err);
  };
});

app.listen(PORT, () =>{
  console.log(`Server running on port: ${PORT}.`);
});
