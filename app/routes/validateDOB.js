const { check } = require('express-validator')
module.exports = {

    validateDOB: check('bdate')

        // To delete leading and trailing space
        // .isISO8601()
        // .toDate()

         .isDate()

        // Custom message
        .withMessage('Must be a valid date')
}
