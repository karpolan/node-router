const http = require('http');

const router = [];

const app = {
  get(path, func) {
    console.log(`get(${path})`);
    router.push({
      path: path,
      method: 'GET',
      handle: func,
    });
  },

  post(path, func) {
    console.log(`post(${path})`);
    router.push({
      path: path,
      method: 'POST',
      handle: func,
    });
  },

  use(path, func) {
    console.log(`use(${path})`);
    router.push({
      path: path,
      method: 'USE',
      handle: func,
    });
  },

  listen(port, cb) {
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('All good!');
    });

    return server.listen.apply(server, arguments);
  },
};

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Server is running on port 3000');
