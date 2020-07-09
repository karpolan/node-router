const http = require('http');

const router = {};

// Create an instance of the http server to handle HTTP requests
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('All good!');
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Server is running on port 3000');
