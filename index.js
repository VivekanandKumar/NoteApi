require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser')
const {connectDb} = require('./db/Connection')
const app = express()
const {noteRoutes} = require('./routes/NoteRouter')
const {userRoutes} = require('./routes/UserRouter')
const cors = require('cors')
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/note',noteRoutes);
app.use('/user',userRoutes);


// server configuration
const PORT = process.env.PORT || 8080;
app.listen(PORT,(err)=>{
  if(err){
    return console.log(err.message);
  }
  console.log(`Server listening on port ${PORT}`);
  connectDb(process.env.mongoURI);
});