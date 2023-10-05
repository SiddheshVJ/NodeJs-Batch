import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

let mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl, () => {
    console.log('Connected to MongoDB')
})