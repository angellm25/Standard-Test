import  express  from "express";
import { addPost, deletePost, editPost, getAllPosts, getById, getByUserId } from "../controllers/posts-controllers.js";

const postRouter = express.Router()


postRouter.get("/", getAllPosts);
postRouter.post("/add", addPost)
postRouter.put("/edit/:id", editPost)
postRouter.get('/:id', getById)
postRouter.put('/:id', deletePost)
postRouter.get('/user/:id', getByUserId)


export default postRouter;


