const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const config = require('config');
const cors = require('cors')
require('dotenv').config();

const userRouter = require('./routes/users'); 
const authRouter = require('./routes/auth');
const subjectRouter = require('./routes/subjects');

// if(!config.get('jwtPrivateKey')) {
//     console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//     process.exit(1);
// }

app.use(express.json());
app.use(cors());
// Import Routes
// const postsRoute= require('./routes/posts');

// app.use('/posts', postsRoute);
// ROUTES
app.get('/', (req, res) => {
    res.send('Hello....');
})
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/subjects', subjectRouter);
// Connect to Db
mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to Db!'));

app.listen(3000);