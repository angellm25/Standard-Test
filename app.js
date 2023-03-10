import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import router from  './routes/user-routes.js';
import postRouter from './routes/post-routes.js';
//import bodyparser from 'body-parser';

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000


app.use('/api/users', router);
app.use("/api/posts", postRouter)






mongoose.connect(process.env.DATABASE_URI). then(() => app.listen(PORT)).then(() => console.log('Connected to database '))
.catch(err =>console.log("ERROR"))
