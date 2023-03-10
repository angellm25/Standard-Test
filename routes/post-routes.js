import  express  from "express";
import { addPost, deletePost, editPost, getAllPosts, getById, getByUserId } from "../controllers/post-controllers.js";

const postRouter = express.Router()


postRouter.get("/", getAllPosts);
postRouter.post("/add", addPost)
postRouter.put("/edit/:id", editPost)
postRouter.get('/:id', getById)
postRouter.delete('/:id', deletePost)
postRouter.get('/:id', getByUserId)


export default postRouter;


