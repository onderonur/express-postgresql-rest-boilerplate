import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import models, { sequelize } from './models';
import routes from './routes';

const app = express();

// There are two kinds of middleware in Express.js: application-level middleware and router-level middleware.
// e.g. "cors" and "helmet" are application-level (application-wide) middlewares.
// Each request that arrives at one of our Express routes goes through the middleware.

// All routes are extended with CORS HTTP headers.
app.use(cors());

app.use(helmet());

// The body-parser extracts the entire body portion of an incoming request stream and makes it accessible on req.body.
// bodyParser.json(): Parses the text as JSON and exposes the resulting object on req.body.
// bodyParser.urlencoded(): Parses the text as URL encoded data (which is how browsers tend to send
// form data from regular forms set to POST) and exposes the resulting object (containing the keys and
// values) on req.body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
// We made the routing independent from all side-effects and pass everything needed to them via the request object with the context object
app.use((req, res, next) => {
  req.context = {
    ...req.contex,
    models
  };
  next();
});

// Pseudo Authentication Middleware
app.use(async (req, res, next) => {
  req.context = {
    ...req.context,
    me: await models.User.findByLogin('onuronder')
  };
  next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

// Seed Db
const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'onuronder',
      messages: [
        {
          text: 'This is the first message ever.'
        }
      ]
    },
    {
      include: [models.Message]
    }
  );

  await models.User.create(
    {
      username: 'testuser',
      messages: [
        {
          text: 'Hello, this is the second message.'
        },
        {
          text: 'Messages are working. Very nice!'
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
};

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  const { PORT } = process.env;

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${PORT}`);
  });
});
