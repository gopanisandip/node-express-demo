const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: [true, "Please enter your name"]
    },
    lastName: String,
    email: String,
    password: Number,
    confirmPassword: Number,
    hobbies: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Note", NoteSchema);    