import { Router } from 'express';
import * as APIController from '../controllers/APIController';

const router = Router();

router.get('/ping', APIController.ping);
router.post('/createUser', APIController.userRegister);
router.get('/listUser', APIController.listAllUsers);
router.get('/listUser/:id', APIController.listUser);
router.put('/updateUser/:id', APIController.updateUser);
router.delete('/deleteUser/:id', APIController.deleteUser);

export default router;
