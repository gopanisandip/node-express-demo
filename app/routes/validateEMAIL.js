const { check } = require('express-validator')
module.exports = {

    validateEMAIL: check('email')
    .isEmail()
    .withMessage('enter the valid email')
}
