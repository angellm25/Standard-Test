import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import router from  './routes/user-routes.js';
import postRouter from './routes/posts-routes.js';
import commentRouter from './routes/comments-routes.js';


const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/users', router);
app.use("/posts", postRouter)
app.use("/posts", commentRouter)






mongoose.connect(process.env.DATABASE_URL). then(() => app.listen(PORT)).then(() => console.log('Connected to database '))
.catch(err =>console.log("Could Not Connect To The Database"))
