import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()
const mongoUrl = process.env.MONGO_URL
let db;


export async function dbConnect() {
    try {
        const client = await new MongoClient(mongoUrl).connect()
        db = client.db('dashboardapi')
        console.log('Connected')
    } catch (err) {
        console.log(err)
    }
}

export async function addUser(query) {
    return await db.collection('sampleUser').insertOne(query)
}


export async function getUser(query) {
    return await db.collection('sampleUser').find(query).toArray()
}
export async function updateUser(condition, data) {
    return await db.collection('sampleUser').updateOne(condition, data)
}

export async function deleteUser(data) {
    return await db.collection('sampleUser').deleteOne(data)
}