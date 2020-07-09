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
      res.end('Route not found\n');
    },
  },
];
const ROUTER_STARTING_INDEX = 1; // router.length()

/**
 * Middleware as array of {path, handle} objects
 */
const middlewares = [
  // Default Middleware at middlewares[0] index
  {
    path: '*',
    handle: function (req, res, next) {
      // Do nothing
    },
  },
];

/**
 * Server instance as a class
 */
const app = {
  // Registers GET handler
  get(path, func) {
    router.push({
      path: path,
      method: 'GET',
      handle: func,
    });
  },

  // Registers POST handler
  post(path, func) {
    router.push({
      path: path,
      method: 'POST',
      handle: func,
    });
  },

  // Registers middleware/use handler
  use(path, func) {
    middlewares.push({
      path: path,
      handle: func,
    });
  },

  // Entry point. To start the server call app.listen(1234, '127.0.0.1');
  listen(port, cb) {
    const server = http.createServer((req, res) => {
      // Run thru middlewares
      const matchedMiddlewares = middlewares.filter((item) => req.url === item.path || item.path === '*');
      for (let i = 0; i < matchedMiddlewares.length; i++) {
        console.log('called middleware', i);
        matchedMiddlewares[i].handle(req, res);
      }

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

/*
curl -X GET http://localhost:3000/test 
*/
app.get('/test', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('/test GET works\n');
});

/*
curl -X POST http://localhost:3000/test 
*/
app.post('/test', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('/test POST works\n');
});

/*
curl -X GET http://localhost:3000/test 
curl -X POST http://localhost:3000/test 
curl -X PUT http://localhost:3000/test 
*/
app.use('/test', (req, res) => {
  res.middleware = 'Middleware use(/test) added this field';
  // res.append('Middleware use(/test) added this line');
  // res.write('Middleware use(/test) added this line');
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Server is running on port 3000');
