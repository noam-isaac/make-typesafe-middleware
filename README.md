[![Build Status](https://img.shields.io/github/actions/workflow/status/noam-isaac/make-typesafe-middleware/publish.yml?branch=main)](https://github.com/noam-isaac/make-typesafe-middleware/actions/workflows/publish.yml)
[![Build Status](https://img.shields.io/npm/v/make-typesafe-middleware)](https://www.npmjs.com/package/make-typesafe-middleware)

# make-typesafe-middleware

This package provides a middleware function for Express that enforces type safety on incoming request data. It uses the zod library for schema validation.

## Installation

To install the package, run one of the following commands:

```
npm install make-typesafe-middleware
```

```
pnpm install make-typesafe-middleware
```

```
yarn add make-typesafe-middleware
```

## Usage

The makeTypesafeMiddleware function takes two arguments: a set of request validation schemas and a middleware callback function.

```
import express from 'express';
import { makeTypesafeMiddleware } from 'make-typesafe-middleware';
import { z } from 'zod';

const app = express();

const userSchema = z.object({
  name: z.string(),
  age: z.number().optional(),
});

const userMiddleware = makeTypesafeMiddleware({
  query: z.object({
    userId: z.number(),
  }),
  body: userSchema,
}, async (req, res, next) => {
  const { userId } = req.query;
  const { name, age } = req.body;
  // Do something with the validated request data
  res.send(`Hello ${name}!`);
});

app.use('/user', userMiddleware);

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
```

In this example, the middleware function enforces that the request contains a userId query parameter and a name field in the request body, and optionally an age field. The validated request data is then passed to the middleware callback for further processing.

If the request data does not match the schema, the middleware will pass an error to the error handler function in the chain. If no such function exists, the error will be passed to the default Express error handler.

Note that as req isn't actually passed to the middleware callback, you can't access the original request object. If you need to, for example, mutate req, you will have to access it from the res object (`res.req`).

## License

This package is licensed under the MIT License. See the LICENSE file for details.

## Credits

This package was inspired by one of [Matt Pocock's YouTube videos](https://www.youtube.com/watch?v=9N50YV5NHaE?t=143).

```

```
