const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const multer = require('multer');
const path = require('path');

//router user
const usersRouter = require('./routers/users');
//router auth
const authRouter = require('./routers/auth');
//router post
const postRouter = require('./routers/post');
//router conversation
const conversationRouter = require('./routers/conversations');
//router message
const messageRouter = require('./routers/messages')

const PORT = process.env.PORT || 4000;

const mongOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
app.use('/images', express.static(path.join(__dirname, 'public/images')))

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename:(req, file, cb) => {
    cb(null, req.body.name);
  }
})
const upload = multer({storage});
app.post('/api/upload', upload.single('file'), (req, res) => {

  try {
    
    return res.status(200).json({message : 'файл успешно загружен'})
  } catch (error) {
   console.log('error in index', error); 
  }
})


app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/messages', messageRouter);

mongoose.connect(process.env.MONGODB_URL, mongOptions).then(() => {
    console.log('mongodb connection');
    app.listen(PORT, () => {
        console.log(`setver started on ${PORT} port`)
    })
})


