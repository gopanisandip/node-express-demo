module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // const multer = require('multer');
    // const upload = multer();

    app.post('/data', notes.create);
    app.post('/login',notes.login);
    app.get('/logout', notes.logout);
    app.get('/notes', notes.findAll);
    app.get('/notes/:noteId', notes.findOne);
    app.put('/notes/:noteId', notes.update);
    app.delete('/notes/:noteId', notes.delete);
}