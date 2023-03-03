# make-typesafe-middleware

This package provides a middleware function for Express that enforces type safety on incoming request data. It uses the zod library for schema validation.

## Installation

To install the package, run the following command:

```
npm install typesafe-middleware
```

## Usage

The makeTypesafeMiddleware function takes two arguments: a set of request validation schemas and a middleware callback function.

```
import { makeTypesafeMiddleware } from 'typesafe-middleware';
import { z } from 'zod';

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
```

In this example, the middleware function enforces that the request contains a userId query parameter and a name field in the request body, and optionally an age field. The validated request data is then passed to the middleware callback for further processing.

## License

This package is licensed under the MIT License. See the LICENSE file for details.
