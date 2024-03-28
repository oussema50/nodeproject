const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/auth');
const homeRouter = require('./routes/home');
const reserveRouter = require('./routes/reserve');
const {checkuser} = require('./middelware/authenticate');
const salleRouter = require('./routes/salle');

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 9000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'assets')));
app.set('view engine', 'ejs');
app.set('views','views');

app.get('*',checkuser);
app.use('/',homeRouter);
app.use('/auth',userRouter);
app.use('/salle',salleRouter);
app.use('/reserve',reserveRouter);

// connection to mongodb and start server 
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('connected to MongoDb');
    app.listen(PORT,()=>{
        console.log(`server listening on ${PORT}`);
    })
}).catch((err) =>{
    console.error('Error connecting to mongodb:',err.message);
})

