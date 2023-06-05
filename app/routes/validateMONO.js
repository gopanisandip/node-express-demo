const { check } = require('express-validator')

module.exports = {

    validateMONO: check('monumber')
        .isMobilePhone()
        //.isLength({ min: 10,max:10 })
        .trim()
        .withMessage("enter the correct mono")
}