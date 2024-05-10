const http = require('node:http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/jokes') {
    fs.readFile('./db.json', 'utf-8', (err, data) => {
      if (err) throw err;

      res.writeHead(200, { 'Content-Type': 'text/plain' });

      res.end(data);
    });
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('server running');
});
