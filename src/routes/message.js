import { Router } from 'express';
import * as messageController from '../controllers/message';

const router = Router();

router.get('/', messageController.getMessages);
router.get('/:messageId', messageController.getMessages);
router.post('/', messageController.createMessage);
router.delete('/:messageId', messageController.deleteMessage);

export default router;
