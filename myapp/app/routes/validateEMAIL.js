const { check } = require('express-validator');
module.exports = {

    validateEMAIL: check('email')
        .notEmpty()
        .isEmail()
        .withMessage('Enter valid email')
}
