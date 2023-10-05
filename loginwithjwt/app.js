import express from 'express';
import dotenv from 'dotenv'
import db from './db'
import cors from './cors'
import { authController } from './controller/authController.js'

dotenv.config()
const port = process.env.PORT || 3113
const app = express();

app.use(cors());
app.use('/api/auth', authController)





app.listen(port, (err) => {
    if (err) throw err;
    console.log(`port ${port} listening.`)
})