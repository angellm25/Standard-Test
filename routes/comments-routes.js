import express from 'express';
import { addComment, deleteComment, getComments} from '../controllers/comments-controllers.js';


const commentRouter = express.Router();

commentRouter.get('/:id/comment', getComments)
commentRouter.post('/:id/comment', addComment)
commentRouter.put('/:id/comment/:id', deleteComment)

export default commentRouter;
