import express from 'express'
import { createClient } from 'redis'
import axios from 'axios'
let port = process.env.PORT || 1896
let app = express()

let client = createClient({
    host: 'localhost',
    port: 6379
})

client.on('error', err => console.log('Redis client error', err))

app.get('/data', async (req, res) => {

    await client.connect();
    let userInput = req.query.country.trim()
    userInput = userInput ? userInput : 'India'
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
    let result = await client.get(userInput)

    if (result) {
        const output = JSON.parse(result)
        res.send(output)
    } else {
        let response = await axios.get(url)
        const output = response.data
        await client.set(userInput, JSON.stringify({ source: 'Redis Cache', output }), { EX: 10, NX: true })
        res.send({ source: 'API Response', output })
    }
    await client.disconnect()
})

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Running on ${port}`)
})