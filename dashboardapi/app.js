import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import fs from 'fs'

import { ObjectId } from 'mongodb'
import { dbConnect,addUser, getUser, updateUser, deleteUser } from './src/controller/dbController'

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')
dotenv.config()
let app = express()
let port = process.env.PORT || 3113

// app log
app.use(morgan('common', { stream: fs.createWriteStream('./app.log') }))

// use middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

//Health check
app.get('/healthCheck', (req, res) => {
    res.send("<h1>Health OK !</h1>")
})

//routes
app.post('/addUser', async (req, res) => {
    let data = req.body
    let response = await addUser(data)
    res.status(200).send(response)
})

app.get('/users', async (req, res) => {
    let query = {}
    if (req.query.city && req.query.role) {
        query = {
            city: req.query.city,
            role: req.query.role,
            isActive: true
        }
    } else if (req.query.city) {
        query = {
            city: req.query.city,
            isActive: true
        }
    } else if (req.query.role) {
        query = {
            isActive: true,
            role: req.query.role
        }
    } else if (req.query.isActive) {
        let isActive = req.query.isActive
        if (isActive === "false") {
            isActive = false
        } else {
            isActive = true
        }
        query = { isActive }
    }
    else {
        query = { isActive: true }
    }
    const output = await getUser(query)
    res.status(200).send(output)
})

// particular user
app.get('/user/:id', async (req, res) => {
    let query = { _id: new ObjectId(req.params.id) }
    let output = await getUser(query)
    res.send(output)

})

// update user
app.put('/updateuser', async (req, res) => {
    let condition = { _id: new ObjectId(req.params.id) }
    let data = {
        $set: {
            "name": req.query.name,
            "city": req.query.city,
            "phone": req.query.phone,
            "role": req.query.role,
            "isActive": req.query.isActive
        }
    }
    let response = await updateUser(condition, data)
    res.send(response)
})

// delete user
app.delete('/deleteuser', async (req, res) => {

    let condition = { _id: new ObjectId(req.query.id) }

    let response = await deleteUser(condition)
    res.send(response)
})

// soft delete :  deactivate user
app.put('/deactivateuser', async (req, res) => {

    let condition = { _id: new ObjectId(req.body._id) }
    let data = {
        $set: {
            isActive: false
        }
    }

    let response = await updateUser(condition, data)
    res.status(200).send(response)
})

// activate user
app.put('/activateuser', async (req, res) => {

    let condition = { _id: new ObjectId(req.body._id) }
    let data = {
        $set: {
            isActive: true
        }
    }

    let response = await updateUser(condition, data)
    res.status(200).send(response)
})

// running port
app.listen(port, async (err) => {
    if (err) throw err;
    dbConnect()
    console.log(`${port} is running`)
})