import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.json(messages);
});

router.get('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId
  );
  return res.json(message);
});

router.post('/', async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id
  });

  return res.json(message);
});

router.delete('/:messageId', async (req, res) => {
  await req.context.models.Message.destroy({
    where: { id: req.params.messageId }
  });

  return res.json({ success: true });
});

export default router;
