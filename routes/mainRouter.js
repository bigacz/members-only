import router from 'express';
import mainController from '../controllers/mainController.js';
import messageRouter from './messageRouter.js';

const mainRouter = router();

mainRouter.use(messageRouter);

mainRouter.get('/register', mainController.getRegister);

mainRouter.post('/register', mainController.postRegister);

mainRouter.get('/login', mainController.getLogin);

mainRouter.post('/login', mainController.postLogin);

mainRouter.get('/', (req, res) => {
  res.redirect('/messages');
});

export default mainRouter;
