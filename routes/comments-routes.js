import express from 'express';
import { addComment, deleteComment, getComments} from '../controllers/comments-controllers.js';


const commentRouter = express.Router();

commentRouter.get('/:id/comments', getComments)
commentRouter.post('/:id/addComment', addComment)
commentRouter.put('/:id/comment/:id', deleteComment)

export default commentRouter;