module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    const multer = require('multer');
    const upload = multer();


    const { check } = require('express-validator');
    const { validateDOB } = require('./validateDOB.js')
    const { validateEMAIL } = require('./validateEMAIL.js')
    const { validatePASS } = require('./validatePASS.js')
    const { validateMONO } = require('./validateMONO.js')


    app.post('/notes',upload.any(), notes.create);

    app.get('/notes', notes.findAll);

    app.get('/notes/:noteId', notes.findOne);

    app.put('/notes/:noteId', notes.update);

    app.delete('/notes/:noteId', notes.delete);
}





