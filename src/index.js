import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const passport = require('passport');
const session = require('express-session')
require('./auth/middleware.js')(passport)


import UserRouter from  '../routes/user-routes.js';
import router from './auth/authRoutes.js';
import postRouter from '../routes/posts-routes.js';
import commentRouter from '../routes/comments-routes.js';

const app = express();

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({limit: '50mb', extended:false})) 
app.use(cors())
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//ROUTES
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/auth', router);
app.use('/users', isAuthenticated, UserRouter);
app.use("/posts", postRouter)
app.use("/posts", commentRouter)
const PORT = process.env.PORT || 5000


//START SERVER
app.listen(process.env.PORT || PORT, () => {
    console.log('Server started on port ${PORT}');
})

//DB CONNECTION
mongoose.connect(process.env.DATABASE_URL). then(() => app.listen(PORT)).then(() => console.log('Connected to database '))
.catch(err =>console.log("Could Not Connect To The Database"))
