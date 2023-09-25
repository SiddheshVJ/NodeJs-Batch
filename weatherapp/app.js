import express from 'express';
let app = express();
import morgan from 'morgan';
import fs from 'fs';
import request from 'request';
import dotenv from 'dotenv';
dotenv.config()
let port = process.env.PORT || 3113

// app log
app.use(morgan('common', { stream: fs.createWriteStream('./app.log') }))

// static files path
app.use(express.static(__dirname + '/public'))

//views
app.set('views', './src/views')

// view engine
app.set('view engine', 'ejs')

//Default
app.get('/weather', (req, res) => {
    let city = req.query.city ? req.query.city : 'Delhi'
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;

    request(url, (err, response) => {
        if (err) {
            console.log(err)
        } else {
            res.send(response.body)
        }
    })
})


app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log(`Server is running on ${port}`)
    }
})