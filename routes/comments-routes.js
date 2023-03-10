import express from 'express';
import { addComment, deleteComment, getComments} from '../controllers/comment-controllers.js';


const commentRouter = express.Router();

commentRouter.get('/posts/:id/comments', getComments)
commentRouter.post('/posts/:id/addComment', addComment)
commentRouter.delete('/posts/:id/deleteComment', deleteComment)

export default commentRouter;