const { check } = require('express-validator');
module.exports = {

    validateLNAME: check('lname')
        .notEmpty()
        .trim()
        .withMessage('enter valid lastname')
}
