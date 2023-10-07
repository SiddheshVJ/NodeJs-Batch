import express from 'express'
import request from 'request'
import superagent from 'superagent'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
let app = express()
let port = process.env.PORT || 3113
let clientId = process.env.CLIENT_ID
let clientSecret = process.env.SECRET_KEY


app.use(cors())

app.get('/', (req, res) => {
    res.send(`<h1><a href = 'https://github.com/login/oauth/authorize?client_id=${clientId}'> Login with Github</a></h1>`)
})

app.get('/profile', (req, res) => {
    const code = req.query.code
    if (!code) {
        res.send({
            success: false,
            message: 'Error in Url'
        })
    }
    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id: clientId,
            client_secret: clientSecret,
            code: code
        })
        .set('Accept', 'application/json')
        .end((err, result) => {
            if (err) throw err;
            let access_token = result.body.access_token
            const option = {
                uri: 'https://api.github.com/user',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            }
            request(option, (err, response, body) => {
                res.send(body)
            })
        })
    // res.send(code)
})


app.listen(port, (err) => {
    if (err) throw err
    console.log(`${port} running`)

})

