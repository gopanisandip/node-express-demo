const express = require('express');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
// const formData = require('express-form-data');

const { validateDOB } = require('./app/routes/validateDOB.js')
const { validateEMAIL } = require('./app/routes/validateEMAIL.js')
const { validatePASS } = require('./app/routes/validatePASS.js')
const { validateMONO } = require('./app/routes/validateMONO.js')
const { validatePHOTO } = require('./app/routes/validatePHOTO.js')


const app = express();
const { validationResult } = require('express-validator')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }

});
var upload = multer({
    storage: storage,

    fileFilter: function (_req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profilephoto');
function checkFileType(file, cb) {
    const filetypes = /png|jpg/;
    const extname = filetypes.test(path.extname(file.originalname));
    const mimetype = filetypes.test(file.mimetype);
    // const validationErrors = validationResult(req);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb("error : not upload ");
    }
}

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});
app.get('/getdata', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/data", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send("you can upload only png and jpg file");
        }
        res.send(req.file);
    });
});


// app.post('/notes', [validateDOB], (req, res) => {

//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.send({ errors })
//     }

//     res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
// });

require('./app/routes/note.routes.js')(app);

app.listen(33000, () => {
    console.log("Server is listening on port 6000");
});

