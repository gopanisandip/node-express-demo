const Note = require('../model/model.js');
const { validationResult } = require('express-validator');

exports.create = (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    const note = new Note({
        firstName: req.body.fname || "not enter name",
        lastName: req.body.lname,
        email: req.body.email,
        password: req.body.pswd,
        confirmPassword: req.body.cpswd,
        hobbies: req.body.hbis
    });
    note.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

exports.login = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const perPage = 3;

    const totalCount = await Note.countDocuments();
    //console.log(totalCount);
    const totalPages = Math.ceil(totalCount / perPage)

    const pagination = {
        prev: page > 1 ? page - 1 : null,
        next: page < totalPages ? page + 1 : null
    };
    //console.log(pagination)

    Note.find(req.query.search ? {
        $or: [
            {
                $and: [
                    { firstName: req.query.search }
                ]
            },
            {
                $and: [
                    { lastName: req.query.search }
                ]
            },
            {
                $and: [
                    { email: req.query.search }
                ]
            },
            {
                $and: [
                    {
                        email: {
                            $regex: req.query.search,
                            $options: "i"
                        }
                    }
                ]
            },
        ]
    } : {})
        .limit(perPage * 1)
        .skip((page - 1) * perPage)
        .exec()
        .then(function (allDetails) {
            res.render("user", {
                allDetails,
                pagination,
                currentPage: page,
                totalPages
            })
        })
        .catch((err) => console.log(err))
}

exports.update = (req, res, next) => {
    let userId = req.params.id;
    Note.findById(userId)
        .then(user => {
            res.render("alldata", {
                user: user
            });
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
},

    exports.updatee = (req, res, next) => {
        console.log(req.body)
        let userId = req.params.id,
            userParams = {
                firstName: req.body.fname,
                lastName: req.body.lname,
                email: req.body.email,
                password: req.body.pswd,
                confirmPassword: req.body.cpswd,
                hobbies: req.body.hbis
            };

        Note.findByIdAndUpdate(userId, {
            $set: userParams
        })
            .then(user => {
                res.redirect("/user");
                res.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error updating user by ID: ${error.message}`);
                next(error);
            });
    }

exports.delete = (req, res) => {
    Note.findByIdAndRemove({ _id: req.params.id })
        .then(() => {
            res.redirect("/user")
            //res.user = user;
        })
        .catch(err => {

            console.log('Failed to Delete Course Details: ' + err);
        })
};