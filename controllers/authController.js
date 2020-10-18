const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const User = require('./../models/User')
const errorFormatter = require('../utils/validationErrorFormatter')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', { title: 'Create a new account', error:{}})
}

exports.signupPostController = async (req, res, next) => {
    
    let { username, email, password } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        return res.render('pages/auth/signup',
         {
              title: 'Create a new account',
               error: errors.mapped(),
               value: {
                   username, email, password
               }
            })
    }


    try {
        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        let createdUser = await user.save()
        console.log('User created successfully', createdUser)
        res.render('pages/auth/signup', { title: 'Create a new account', error: {}})
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.loginGetController = (req, res, next) => {
    let isLoggedIn = req.get('Cookie').includes('isLoggedIn=true') ? true : false
    res.render('pages/auth/login', { title: 'Login to your account', error: {}, isLoggedIn})
}

exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body


    let isLoggedIn = req.get('Cookie').includes('isLoggedIn=true') ? true : false
    res.render('pages/auth/login', { title: 'Login to your account', error: {}, isLoggedIn})

    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        return res.render('pages/auth/login',
         {
              title: 'Login to your account',
               error: errors.mapped()
            })
    }

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.json({
                message: 'Invalid Credential'
            })
        }

        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.json({
                message: 'Invalid Credential'
            })
        }

        res.setHeader('Set-Cookie', 'isLoggedIn=true')
        res.render('pages/auth/login', { title: 'Login to your account', error: {}, isLoggedIn})
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.logoutController = (req, res, next) => {

}