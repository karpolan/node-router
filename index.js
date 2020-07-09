const http = require('http');

/**
 * Router as array of {path, method, handle} objects
 */
const router = [
  // Default route at router[0] index
  {
    path: '*',
    method: '*',
    handle: function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Route not found');
    },
  },
];
const ROUTER_STARTING_INDEX = 1; // router.length()

/**
 * Server instance as a class
 */
const app = {
  // Registers GET handler
  get(path, func) {
    console.log(`get(${path})`);
    router.push({
      path: path,
      method: 'GET',
      handle: func,
    });
  },

  // Registers POST handler
  post(path, func) {
    console.log(`post(${path})`);
    router.push({
      path: path,
      method: 'POST',
      handle: func,
    });
  },

  // Registers middleware/use handler
  use(path, func) {
    console.log(`use(${path})`);
    router.push({
      path: path,
      method: '*',
      handle: func,
    });
  },

  // Entry point. To start the server call app.listen(1234, '127.0.0.1');
  listen(port, cb) {
    const server = http.createServer((req, res) => {
      // Run thru all routes after default.
      for (let i = ROUTER_STARTING_INDEX; i < router.length; i++) {
        if (
          (req.url === router[i].path || router[i].path === '*') &&
          (req.method === router[i].method || router[i].method === '*')
        ) {
          return router[i].handle && router[i].handle(req, res);
        }
      }

      // None of the routes match, return default route
      return router[0].handle && router[0].handle(req, res);
    });

    return server.listen.apply(server, arguments); // Note: arguments ara all params come to listen(...)
  },
};

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Server is running on port 3000');
