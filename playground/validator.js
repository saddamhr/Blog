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
            .withMessage('Username cant not be grater than 15 character')
            .trim(),
        check('email')
            .isEmail()
            .withMessage('Please provide a valid email')
            .normalizeEmail(),
            check('password').custom(value => {
                if(value.length < 5) {
                    throw new Error('Password must be greater than 5 character')
                }
                return true
            }),
            check('confirmPassword').custom((value, {req}) => {
                if(value !== req.body.password) {
                    throw new Error('Password does not match')
                }
                return true
            })
    ], (req, res, next) => {
        let errors = validationResult(req)

        const formatter = (error) => error.msg

        console.log(errors.isEmpty())
        console.log(errors.array())
        console.log(errors.mapped())
        
        console.log(errors.formatWith(formatter).mapped())
        console.log(req.body.username, req.body.email)
        res.render('playground/signup', { title: 'Validator Playground' })
    })

module.exports = router