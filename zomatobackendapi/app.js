import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import bodyParser, { json } from 'body-parser'
import cors from 'cors'

let app = express()
dotenv.config()
let port = process.env.PORT || 3113
let mongo_url = process.env.MONGO_URL
let authKey = process.env.AUTH_KEY
const client = new MongoClient(mongo_url)
let db;

// use middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Authourisation function
function auth(key) {
    if (key == authKey) {
        return true
    } else {
        return false
    }
}
/*
function getData(colName, query) {
    let output;
    if (colName && query) {
        db.collection(colName).find(query).toArray((err, data) => {
            if (err) throw err;
            console.log(data)
            output = data
        }) 
        return output
    } else {
        return 'Data missing'
    }
}*/

// get heart beat
app.get('/', (req, res) => {
    res.status(200).send('health OK')
})


// List of city
app.get('/locations', (req, res) => {
    let key = req.header('x-basic-token') // token verification
    if (auth(key) || key == authKey) {
        db.collection('locations').find().toArray((err, data) => {
            if (err) throw err;
            res.status(200).send(data)
        })
    } else {
        res.status(401).send("<h3>Not Authenticated</h3>")
    }
})

// List of restaurants
app.get('/restaurants', (req, res) => {
    let query = {}
    // from param and query we get string only so change it into number always
    let stateId = Number(req.query.stateId)
    let mealId = Number(req.query.mealId)

    if (stateId && mealId) {
        query = {
            state_id: stateId,
            "mealTypes.meal_id": mealId
        }
    } else if (stateId) {
        query = { state_id: stateId }
    } else if (mealId) {
        query = { "mealTypes.meal_id": mealId }
    } else {
        query = {}
    }


    db.collection('restaurant_data').find(query).toArray((err, data) => {
        if (err) throw err;
        res.status(200).send(data)
    })
})

// list of meals
app.get('/meals', (req, res) => {
    let query = {}
   
    db.collection("meal_types").find(query).toArray((err, data) => {
        if (err) throw err;
        res.status(200).send(data)
    }) 
})

MongoClient.connect(mongo_url, (err, client) => {
    if (err) console.log('Error while connecting Mongodb')
    db = client.db('Sample_restaurant_data')
    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`Running on port ${port}`)
    })

})