const { check } = require('express-validator')

module.exports = {

    validatePASS: check('password')
        .isLength({ min: 6,max:6 })
        .isUppercase()
        .withMessage("enter the correct password")
}