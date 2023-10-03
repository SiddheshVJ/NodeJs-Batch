import express from 'express';
import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';

const app = express();
dotenv.config()


const mongoUrl = process.env.MONGO_URL
const client = new MongoClient(mongoUrl);

async function main() {
    await client.connect();
}

const collection = client.db('dashboardapi').collection('sampleUser');
const port = process.env.PORT || 7710;

app.use('/api-doc', serve, setup(swaggerDocument))


app.use(express.static(__dirname + '/public'))
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.get('/health', (req, res) => {
    res.send('Health Ok')
})

app.get('/', async (req, res) => {
    const output = [];
    const cursor = collection.find();
    for await (const doc of cursor) {
        output.push(doc)
    }
    cursor.closed;
    res.render('index', { data: output })
})

app.get('/new', (req, res) => {
    res.render('forms')
})

//insert user
app.post('/addUser', async (req, res) => {
    let data = {
        name: req.body.name,
        city: req.body.city,
        phone: req.body.phone,
        role: req.body.role ? req.body.role : 'User',
        isActive: true
    }
    await collection.insertOne(data);
    res.redirect('/')
})

//get users
app.get('/users', async (req, res) => {
    const output = [];
    let query = {};
    if (req.query.city && req.query.role) {
        query = {
            city: req.query.city,
            role: req.query.role,
            isActive: true
        }
    }
    else if (req.query.city) {
        query = {
            city: req.query.city,
            isActive: true
        }
    } else if (req.query.role) {
        query = {
            role: req.query.role,
            isActive: true
        }
    } else if (req.query.isActive) {
        let isActive = req.query.isActive;
        if (isActive == "false") {
            isActive = false
        } else {
            isActive = true
        }
        query = { isActive }
    } else {
        query = { isActive: true }
    }
    const cursor = collection.find(query);
    for await (const data of cursor) {
        output.push(data)
    }
    cursor.closed;
    res.send(output)
})

//get particular user
app.get('/user/:id', async (req, res) => {
    const output = [];
    let query = { _id: new ObjectId(req.params.id) }
    const cursor = collection.find(query);
    for await (const data of cursor) {
        output.push(data)
    }
    cursor.closed;
    res.send(output)
})

//update user
app.put('/updateUser', async (req, res) => {
    await collection.updateOne(
        { _id: new ObjectId(req.body._id) },
        {
            $set: {
                name: req.body.name,
                city: req.body.city,
                phone: req.body.phone,
                role: req.body.role,
                isActive: true
            }
        }
    )
    res.send('Record Updated')
})

/* Delete User */
app.delete('/deleteUser', async (req, res) => {
    await collection.deleteOne({
        _id: new ObjectId(req.body._id)
    })
    res.send('User Deleted')
})


//softdelete user
app.put('/deactivateUser', async (req, res) => {
    await collection.updateOne(
        { _id: new ObjectId(req.body._id) },
        {
            $set: {
                isActive: false
            }
        }
    )
    res.send('User Deactivated')
})

//softdelete user
app.put('/activateUser', async (req, res) => {
    await collection.updateOne(
        { _id: new ObjectId(req.body._id) },
        {
            $set: {
                isActive: true
            }
        }
    )
    res.send('User Activated')
})

app.listen(port, () => {
    main()
    console.log(`Running on port ${port}`)
})