const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('./backend/221101/index.html', (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    };
    res.end(data);
  });
});

const PORT = process.env.PORT || 4040;

server.listen(PORT, 'localhost', () => {
  console.log(`Server running on port ${PORT}`);
});
