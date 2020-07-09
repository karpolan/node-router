const http = require('http');

const router = [];

// Create an instance of the http server to handle HTTP requests
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('All good!');
});

app.prototype.get = function (path, func) {
  console.log(`get(${path})`);
  router.push({
    path: path,
    method: 'GET',
    handle: func,
  });
};

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Server is running on port 3000');
