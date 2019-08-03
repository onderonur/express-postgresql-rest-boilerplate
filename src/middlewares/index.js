import models from '../models';

// Blueprint for a middleware
// The next function, which is available as third argument, is called to signalize that the middleware has finished its job.
// This becomes more important when your middleware uses asynchronous functions.
// app.use((req, res, next) => {
//   // do something
//   next();
// });

// Instead of having access to the sample data in all routes from outside variables as
// before (which is an unnecessary side-effect and doesn’t keep the function pure),
// we want to use the models (and authenticated user etc.) from the function’s arguments.
// We are using the application-wide middleware to pass the models to all our routes in a context object now.
// We made the routing independent from all side-effects and pass everything needed to them via the request object with the context object.
export const modelInjection = (req, res, next) => {
  req.context = {
    ...req.contex,
    models
  };
  next();
};

// Pseudo Authentication Middleware
export const loggedInUser = async (req, res, next) => {
  req.context = {
    ...req.context,
    me: await models.User.findByLogin('onuronder')
  };
  next();
};

// Error handling middleware
// http://expressjs.com/en/api.html
// Error-handling middleware always takes four arguments. You must provide four arguments to identify
// it as an error-handling middleware function. Even if you don’t need to use the next object,
// you must specify it to maintain the signature. Otherwise, the next object will be interpreted as
// regular middleware and will fail to handle errors.
export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  } else {
    res.status(err.status || 500);
    res.json({
      message: err.message
    });
  }
};
