const express = require('express')
const db = require('./db')
const cors = require('cors')


let app = express()
let port = 1896



app.use(cors())


const AuthController = require('./controller/authController')

app.use('/api/auth', AuthController)


app.listen(port, (err) => {
    if (err) throw err
    console.log(`${port} is running`)
})