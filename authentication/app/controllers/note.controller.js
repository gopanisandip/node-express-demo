const Note = require('../models/note.model.js');
const { validationResult } = require('express-validator');


exports.create = async (req, res) => {


    // console.log(req);
    // const errors = validationResult(req);
    // console.log(errors);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         success: false,
    //         errors: errors.array()
    //     });
    // }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const note = new Note({
        name,
        email,
        password,
    });
    await note.save()
        .then(data => {
            res.send({
                message: "Register Successfully",
                note: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });

};

exports.login = async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({ message: "enter all field email" });
    }

    try {
        const user = await Note.findOne({ email, password })
        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "Incorrect Email or Password",
            })
        } else {
            res.status(200).json({
                message: "Login successful",
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}

exports.logout = async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        // secure:true,
        // sameSite:true
    }).json({
        success: true,
        message: "Logout Successfully",
    })
};


exports.findAll = (req, res) => {
    Note.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
};

exports.update = (req, res) => {
    if (!req.body.email) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    };

    Note.findByIdAndUpdate(req.params.noteId, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,


    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
};

exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
};
