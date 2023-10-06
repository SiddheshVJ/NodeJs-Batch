const express = require('express')

const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')
const User = require('../model/userSchema')


router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


// get all users

router.get('/users', async (req, res) => {
    let output = await User.find({})
    res.status(200).send(output)
})

// register user
router.post('/register', async (req, res) => {
    // encrypt password
    let hashPass = bcrypt.hashSync(req.body.password, 8)
    let response = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
        phone: req.body.phone,
        role: req.body.role ? req.body.role : 'user',
    })

    res.status(200).send("User Successfully registered")
})


// login user
router.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email })

    if (!user) {
        res.send({ auth: false, token: 'No user found register please' })
    } else {
        const passIsValid = bcrypt.compareSync(req.body.password, user.password)

        if (!passIsValid) {
            res.send({ auth: false, token: 'Invalid password' })
        } else {
            let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 })
            res.send({ auth: true, token: token })

        }

        // in case both match

    }
})

module.exports = router