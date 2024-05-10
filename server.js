const http = require('node:http');

const server = http.createServer((req, res) => {
  console.log({ url: req.url, method: req.method, body: 'Hello' });
});

server.listen(8000, '127.0.0.1', () => {
  console.log('server running');
});
