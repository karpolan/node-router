# node-router

Express alike router for get(), post() and use()

## How to run

`npm start`

## How to test

Use curl or Postman

```
curl -X GET http://localhost:3000/test
curl -X POST http://localhost:3000/test
curl -X PUT http://localhost:3000/test
...
```

## Limitations

- `/*` and `/:paramId` urls are not supported
- `next()` with blocking other middleware is not implemented
