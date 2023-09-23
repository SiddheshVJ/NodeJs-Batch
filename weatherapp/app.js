let express = require('express')
let app = express()
let morgan = require('morgan')
let fs = require('fs')
let request = require('request')
let dotenv = require('dotenv')
dotenv.config()
let weatherApiRouter = require('./src/controller/weatherApiRouter')
let port = process.env.PORT || 3113

// app log
app.use(morgan('common', { stream: fs.createWriteStream('./app.log') }))

// static files path
app.use(express.static(__dirname + '/public'))

//views
app.set('views', './src/views')

// view engine
app.set('view engine', 'ejs')

//Default
app.get('/', (req, res) => {
    res.send("<h1>Weather app</h1>")
})

app.use('/weather', weatherApiRouter)

app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log(`Server is running on ${port}`)
    }
})