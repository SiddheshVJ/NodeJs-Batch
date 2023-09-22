let express = require('express')
let app = express();
let fs = require('fs')
let dotenv = require('dotenv')
let morgan = require('morgan')
dotenv.config()
let port = process.env.PORT || 3113
let categoryRouter = require('./src/controller/categoryRouter')
let productRouter = require('./src/controller/productRouter')

//logging info using fs system
app.use(morgan('common', { stream: fs.createWriteStream('./app.log') }))

// static files path
app.use(express.static(__dirname + '/public'))

// html path
app.set('views', './src/views')

// template engine 
app.set('view engine', 'ejs')

// Default url
app.get('/', (req, res) => {
    // res.send("<h1>Hello welcome to full stack application</h1>")
    res.render('index', { title: "Full stack app" })
})


app.use('/category', categoryRouter)
app.use('/products', productRouter)


app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log(`server is running on ${port}`)
    }
})