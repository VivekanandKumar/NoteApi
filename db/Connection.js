const mongoose = require('mongoose')

const connectDb = (url) =>{
    mongoose.connect(url,(err)=>{
        if(err){
            return console.log(err.message);
        }
        console.log("Database Connected.");
    });
}

module.exports = {connectDb};