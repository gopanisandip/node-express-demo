const Note = require('../models/note.model.js');
const { validationResult } = require('express-validator');

exports.create = (req, res) => {

    const note = new Note({
        fname: req.body.fname || "Untitled Note",
        lname: req.body.lname,
        email: req.body.email,
        bdate: req.body.bdate,
        monumber: req.body.monumber,
        hobbies: req.body.hobbies,
        password: req.body.password,
        profilephoto: req.body.profilephoto

    });

    note.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
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
    if (!req.body.lname) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    };

    Note.findByIdAndUpdate(req.params.noteId, {
        fname: req.body.fname || "Untitled Note",
        lname: req.body.lname,
        email: req.body.email,
        bdate: req.body.bdate,
        monumber: req.body.monumber,
        hobbies: req.body.hobbies,
        password: req.body.password,
        profilephoto: req.body.profilephoto

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