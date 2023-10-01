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
        // db.collection('sampleUser')
        return db
    } catch (err) {
        console.log(err)
    }
}