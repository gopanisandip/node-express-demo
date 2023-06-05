const { check } = require('express-validator');
module.exports = {

    validatePSWD: check('pswd')
        .trim()
        .notEmpty()
        .isLength({ min: 5, max: 5 })
        .withMessage('Password required')
}
