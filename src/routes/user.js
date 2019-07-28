import { Router } from 'express';

const router = Router();

// Another important aspect of REST is that every URI acts as a resource.

// You can go through the resource represented by one URI with different operations
// by using the http://localhost:8000/users API endpoint.
router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.json(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  return res.json(user);
});

export default router;
