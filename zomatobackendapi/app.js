import express from 'express'
import { ObjectId, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import bodyParser, { json } from 'body-parser'
import cors from 'cors'
import { getData, postData, getDataWithSort, getDataWithSortLimit } from './src/controller/apiController'

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

// Authorization function
function auth(key) {
    if (key == authKey) {
        return true
    } else {
        return false
    }
}

// get heart beat
app.get('/', (req, res) => {
    res.status(200).send('health OK')
})

// List of city
app.get('/locations', async (req, res) => {
    let key = req.header('x-basic-token') // token verification
    if (auth(key) || key == authKey) {
        let query = {}
        let collection = 'locations'
        let output = await getData(db, collection, query)
        res.status(200).send(output)

    } else {
        res.status(401).send("<h3>Not Authenticated</h3>")
    }
})

// List of restaurants
app.get('/restaurants', async (req, res) => {
    let query = {}
    // from param and query we get string only so change it into number always
    let stateId = Number(req.query.stateId)
    let mealId = Number(req.query.mealId)
    let collection = "restaurant_data"


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

    let output = await getData(db, collection, query)
    res.status(200).send(output)
})

// list of meals
app.get('/meals', async (req, res) => {
    let query = {}
    let collection = "meal_types"
    let output = await getData(db, collection, query)
    res.send(output)
})

//filters
app.get('/filter/:mealId', async (req, res) => {
    let query = {}
    let collection = "restaurant_data"
    let mealId = Number(req.params.mealId)
    let cuisineId = Number(req.query.cuisineId)
    let hCost = Number(req.query.hCost)
    let lCost = Number(req.query.lCost)
    let sort = { cost: 1 }
    let skip = 0
    let limit = 100000

    if (req.query.skip && req.query.limit) {
        skip = Number(req.query.skip)
        limit = Number(req.query.limit)
    }

    if (req.query.sort) {
        sort = { cost: req.query.sort }
    }

    if (cuisineId && hCost && lCost) {
        query = {
            "mealTypes.mealtype_id": mealId,
            "cuisines.cuisine_id": cuisineId,
            $and: [{ cost: { $gt: lCost, $lt: hCost } }]
        }

    } else if (cuisineId) {
        query = {
            "mealTypes.mealtype_id": mealId,
            "cuisines.cuisine_id": cuisineId
        }
    }

    let output = await getDataWithSortLimit(db, collection, query, sort, skip, limit)
    res.status(200).send(output)
})


// Restaurant details

app.get('/details/:id', async (req, res) => {
    let _id = ObjectId(req.params.id) // ObjectId() = to access the _id of object 
    let query = {
        _id
    }
    let collection = "restaurant_data"
    let output = await getData(db, collection, query)
    // console.log(output)
    res.send(output)
})

// menu wrt restaurant
app.get('/menu/:id', async (req, res) => {
    let id = Number(req.params.id)
    let query = { restaurant_id: id }
    let collection = "restaurants_menu"
    let output = await getData(db, collection, query)
    res.send(output)
})

//order 
app.get('/orders', async (req, res) => {
    let query = {}
    let collection = "orders"
    if (req.query.email) {
        query = { email: req.query.email }
    } else {
        query = {}
    }

    let output = await getData(db, collection, query)
    res.send(output)
})



MongoClient.connect(mongo_url, { useNewUrlParser: true }, (err, client) => {
    if (err) console.log('Error while connecting Mongodb')
    db = client.db('Sample_restaurant_data')
    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`Running on port ${port}`)
    })
})