import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import fileUpload from 'express-fileupload'

let port = process.env.PORT || 3113
let app = express()

//app activity login
app.use(morgan("common", { stream: fs.createWriteStream('./app.log') }))

//public folder
app.use(express.static(__dirname + '/public'))
//html path
app.set('views', './src/views')
// engine template
app.set('view engine', 'ejs')

app.use(fileUpload())

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/profile', (req, res) => {
    console.log(req.files);
    console.log(req.body)
    const imageFile = req.files.fileName;
    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`, (err, data) => {
        if (err) throw err;
        res.render('display', { title: req.body.imgName, image: imageFile.name })

    })
})

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`${port} is active and running`)
})