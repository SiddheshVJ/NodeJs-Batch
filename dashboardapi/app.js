import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()
let app = express()
let port = process.env.PORT || 3113


let addUserRouter = require('./src/routes/addUserRouter')


// app log
app.use(morgan('common', { stream: fs.createWriteStream('./app.log') }))


// use middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//Health check
app.get('/healthCheck', (req, res) => {
    res.send("<h1>Health OK !</h1>")
})


//routes
app.use('/addUser', addUserRouter)


// running port
app.listen(port, (err) => {
    if (err) throw err;
    let msg = "DB Connected"
    console.log(`${port} is running`)
})