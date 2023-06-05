const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    lname: String,
    fname: String,
    email: String,
    bdate: String,
    monumber: Number,               
    hobbies: String,
    password:String,
    profilephoto:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);