import router from 'express';
import mainController from '../controllers/mainController.js';

const mainRouter = router();

mainRouter.get('/register', mainController.getRegister);

mainRouter.post('/register', mainController.postRegister);

mainRouter.get('/login', mainController.getLogin);

mainRouter.post('/login', mainController.postLogin);

// PROTECTED ROUTES

mainRouter.get('/newMessage', mainController.getNewMessage);

mainRouter.post('/newMessage', mainController.postNewMessage);

mainRouter.get('/', (req, res) => {
  // TODO RENDER message board
});

export default mainRouter;
