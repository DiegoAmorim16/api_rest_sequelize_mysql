import { Router } from 'express';
import userController from '../controllers/UserController';

//import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não deveria existir
router.get('/', userController.index); // Lista usuários
router.get('/:id', userController.show); // Lista usuário
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
