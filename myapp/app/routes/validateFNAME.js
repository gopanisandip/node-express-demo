const { check } = require('express-validator');
module.exports = {

    validateFNAME: check('fname')
        .notEmpty()
        .trim()
        .withMessage('enter valid firstname')
}
