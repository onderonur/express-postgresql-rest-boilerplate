import { Router } from 'express';
import * as sessionController from '../controllers/session';

const router = Router();

// It’s the first time you break the rules of being entirely RESTful,
// because you offer an API endpoint for a very specific feature.
// It will not be the first time you break the laws of REST, because most often
// REST is not fully implemented RESTful but rather RESTish.
router.get('/', sessionController.getSession);

export default router;
