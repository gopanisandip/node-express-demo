module.exports = (app) => {
    const notes = require('../control/control.js');

    const { validateFNAME } = require('./validateFNAME.js')
    const { validateLNAME } = require('./validateLNAME.js')
    const { validateEMAIL } = require('./validateEMAIL.js')
    const { validatePSWD } = require('./validatePSWD.js')
    const { validateCPSWD } = require('./validateCPSWD.js')

    app.post('/notes', [validateFNAME, validateLNAME, validateEMAIL, validatePSWD, validateCPSWD], notes.create);
    app.post("/user", notes.login)
    app.get("/user", notes.login)
    app.get('/delete/:id', notes.delete)
    app.get('/update/:id', notes.update)
    app.post('/user/:id', notes.updatee)

}
