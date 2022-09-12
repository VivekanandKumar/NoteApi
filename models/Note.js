const {Schema,model} = require('mongoose');

const NoteSchema = Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = model('Note',NoteSchema);