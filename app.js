const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

// IMPORT ROUTES
const authRoutes = require('./routes/authRoute')

const app = express()

// SETUP VIEW ENGINE
app.set('view engine', 'ejs')
app.set('views', 'views')

// MIDDLEWARE ARRAY
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json()
]

app.use(middleware)

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

const PORT = process.env.PORT || 8080
mongoose.connect('mongodb+srv://DiveIntoNodeJS:saddamhr@cluster0.axmnr.mongodb.net/exp-blog?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database connected')
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`)
        })
    })
    .catch(e => {
        return console.log(e)
    })