const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
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


const data = path.join(__dirname, "./views")

app.set("view engine", "hbs");
app.set("views", data);

app.get("/data", (req, res) => {
    res.render("app");
});
app.get('/', (req, res) => {
    res.send("welcome in backend");
});
require('./app/routes/note.routes.js')(app);

app.listen(10000, () => {
    console.log("Server is listening on port 10000");
});

