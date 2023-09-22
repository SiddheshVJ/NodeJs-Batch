let express = require('express')
let app = express();
let dotenv = require('dotenv')
dotenv.config()
let port = process.env.PORT || 3113

let categoryRouter = require('./src/controller/categoryRouter')
let productRouter = require('./src/controller/productRouter')

// Default url

app.get('/', (req, res) => {
    res.send("<h1>Hello welcome to full stack application</h1>")
})


app.use('/category', categoryRouter)
app.use('/products', productRouter)
app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log(`server is running on ${port}`)
    }
})