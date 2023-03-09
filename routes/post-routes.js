import  express  from "express";
import { addPost, deletePost, editBlog, getAllPosts, getById, getByUserId } from "../controllers/post-controllers.js";

const postRouter = express.Router()


postRouter.get("/", getAllPosts);
postRouter.post("/add", addPost)
postRouter.put("/edit/:id", editBlog)
postRouter.get('/:id', getById)
postRouter.delete('/:id', deletePost)
postRouter.get('/user/:id', getByUserId)

export default postRouter;
