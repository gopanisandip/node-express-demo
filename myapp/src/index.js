const express = require("express");
const bodyParser = require('body-parser');
const app = express();
// const hbs = require('hbs');
// const exphbs = require('express-handlebars');
const path = require("path");
const { validationResult, Result } = require('express-validator')

const { validateFNAME } = require('../app/routes/validateFNAME.js')
const { validateLNAME } = require('../app/routes/validateLNAME.js')
const { validateEMAIL } = require('../app/routes/validateEMAIL.js')
const { validatePSWD } = require('../app/routes/validatePSWD.js')
const { validateCPSWD } = require('../app/routes/validateCPSWD.js')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const dbConfig = require('../config/configg.js');
const mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
    title: String,
    dis: String,
    name: String,
    image: Buffer,
})
let Image = mongoose.model('tables', imageSchema)

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const data = path.join(__dirname, "../views")

app.set("view engine", "hbs");
app.set("views", data);

app.get("/notes", (req, res) => {
    res.render("index");
});
app.get("/signin", (req, res) => {
    res.render("signin");
});
app.get("/uploadimage", (req, res) => {
    res.render("uploadimage");
});
// app.get("/data", (req, res) => {
//     res.render("data");
// });

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// app.post('/uploadimage', function (req, res) {
//     upload(req, res, function (err) {
//         if (err) {
//             return res.end("Error uploading file.");
//         }
//         res.end("File upload successfully")
//     });
// });

app.post("/uploadimage", upload.array("myfile"), (req, res) => {
    const files = req.files;

    files.forEach(file => {
        const image = new Image({
            title: req.body.title,
            dis: req.body.dis,
            name: file.originalname,
            image: file.buffer,
        });
        // image.save((err)=>{
        //     if(err){
        //         console.log(err);
        //     }

        //     });
        image.save()
            .then(data => {
                console.log(data);
            })
    });
    res.send("file uploaded successfully");
});


const fs = require('fs');
const { table } = require("console");

const stats = fs.statSync('./uploads');
const fileSizeInBytes = stats.size;
const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);  // file size in MB

console.log(fileSizeInBytes + ' bytes')
console.log(fileSizeInMegabytes + ' megabytes')

require('../app/routes/routes.js')(app);

app.listen(16000, () => {
    console.log("run succesfully")
})