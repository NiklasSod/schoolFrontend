import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const server = http.createServer((req, res) => {
  let fileName;
  switch (req.url) {
    case '/':
      fileName = 'index.html';
      break;
    default:
      fileName = 'err.html';
  };
  let filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, 'UTF-8', (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    };
    res.end(data);
  });
});

const PORT = process.env.PORT || 5050;

server.listen(PORT, 'localhost', () => {
  console.log(`Server running on port ${PORT}`);
});

