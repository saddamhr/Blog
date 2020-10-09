const router = require('express').Router()
const { check, validationResult } = require('express-validator')

router.get('/validator', (req, res, next) => {
    res.render('playground/signup', { title: 'Validator Playground' })
})

router.post('/validator',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage('Username can not be empty')
            .isLength({ max: 15 })
            .withMessage('Username cant not be grater than 15 character'),
        check('email')
            .isEmail()
            .withMessage('Please provide a valid email')
    ], (req, res, next) => {
        let errors = validationResult(req)
        console.log(errors)
        res.render('playground/signup', { title: 'Validator Playground' })
    })

module.exports = router