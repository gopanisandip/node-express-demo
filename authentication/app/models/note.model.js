const mongoose = require("mongoose");
const validator = require("validator")

const NoteSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please enter your name"],
    },
    email: {
        type: String,
        require: [true, "Enter valid email"],
        unique: true,
        validate: validator.isEmail,
        
    },
    password: {
        type: String,
        require: [true, "Enter valid password"],

    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

module.exports = mongoose.model('Note', NoteSchema);