import router from 'express';
import messageController from '../controllers/messageController.js';

const messageRouter = router();

messageRouter.post('/message', messageController.postMessage);

messageRouter.delete('/message', messageController.deleteMessage);

messageRouter.get('/messages', messageController.getMessages);

messageRouter.get('/message/new', messageController.getMessageNew);

export default messageRouter;
