import session from './session';
import user from './user';
import message from './message';

// Every of our modular routes from Express Router is mounted to our Express application with a
// dedicated URI in the src/index.js file now. The modular routes in the src/routes folder
// only take care of their sub paths and their implementation details while the mounting in
// the src/index.js file takes care of the main path and the mounted modular route that is used there.

export default {
  session,
  user,
  message
};
