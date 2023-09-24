let expess = require('express')
let axios = require('axios')
let redis = require('redis')
let port = process.env.PORT || 3113
let app = expess()

let client = redis.createClient({
    host: 'localhost',
    port: 6379
})

app.get('/data', (req, res) => {
    let userInput = req.query.country.trim()
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;

    // check data in redis
    return client.get(userInput, (err, result) => {
        //is data is in redis
        if (result) { 
            const output = JSON.parse(result)
            res.send(output)
        } else {
            // as data is not in redis then call api
            // get data and save in dbb for next time
            axios.get(url)
                .then((response) => {
                    //save the response in redis for nexttime
                    const output = response.data
                    client.setex(userInput, 3600, JSON.stringify({ source: 'Redis Cache', output }))

                    //for first tme return the data
                    res.send({ source: 'API Response', output })
                })
        }
    })
})

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Running on ${port}`)
})