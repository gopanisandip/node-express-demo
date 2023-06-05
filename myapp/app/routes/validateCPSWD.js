const { check } = require('express-validator');
module.exports = {

    validateCPSWD:
        check('cpswd')
            .trim()
            .isLength({ min: 5, max: 5 })
            .withMessage('enter confirm password')
            .custom(async (confirmPassword, { req }) => {
                const password = req.body.pswd
                if (password !== confirmPassword) {
                    throw new Error('Passwords must be same')
                }
            }),
}
