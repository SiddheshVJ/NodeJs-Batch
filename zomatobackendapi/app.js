import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

let app = express()
dotenv.config()
let db;
let port = process.env.PORT || 3113
let mongo_url = process.env.MONGO_URL


// use middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// get heart beat
app.get('/', (req, res) => {
    res.status(200).send('Health OK.')
})

MongoClient.connect(mongo_url, { useNewUrlParser: true }, (err, client) => {
    if (err) console.log('Error while connecting to Mongo.')
    db = client.db('arpnode')
    app.listen(port, () => {
        console.log(`Running on port ${port}`)
    })
})