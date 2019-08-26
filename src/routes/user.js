import { Router } from 'express';
import * as userController from '../controllers/user';

const router = Router();

// Another important aspect of REST is that every URI acts as a resource.

// You can go through the resource represented by one URI with different operations
// by using the http://localhost:8000/users API endpoint.
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);

export default router;
