const { body } = require('express-validator')

module.exports = [
    body('email')
    .not().isEmpty().withMessage('Email cant not be empty'),
    body('password').not().isEmail().withMessage('Password can not be empty')
]