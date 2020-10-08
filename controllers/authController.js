const user = require('./../models/User')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {title: 'Create a new account'})
}

exports.signupPostController = async (req, res, next) => {
    let {username, email, password} = req.body

    let user = new user({
        username,
        email,
        password
    })

    try {
        let createdUser = await user.save()
        console.log('User created successfully', createdUser)
        res.render('pages/auth/signup', {title: 'Create a new account'})
    } catch (error) {
        console.log(e)
        next(e)
    }
}

exports.loginGetController = (req, res, next) => {

}

exports.loginPostController = (req, res, next) => {

}

exports.logoutController = (req, res, next) => {

}