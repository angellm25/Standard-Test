import express from 'express';
import { getByUserId } from '../controllers/post-controllers.js';
import { deleteUser, getAllUser, login, signup, updateUser } from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', getAllUser)
router.post('/signup', signup)
router.post('/login', login)
router.get('/user/:id',getByUserId)
router.delete('/:id', deleteUser)
router.patch('/:id/update', updateUser)

export default router; 