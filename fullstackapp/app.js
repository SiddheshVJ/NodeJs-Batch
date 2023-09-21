let express = require('express')
let app = express();
let dotenv = require('dotenv')
dotenv.config()
let port = process.env.PORT || 3113

// Default url
app.get('/', (req, res) => {
    res.send('<h1 > Hello from express</h1>')
    // res.end() not requied beacause express internally manage
})

app.get('/test', (req, res) => {
    res.send('<h1> Test route</h1>')
})

app.listen(port, (err) => {
    if (err) throw err;
    else { 
        console.log(`server is running on ${port}`)
    }
})