
let express = require('express')
let productRouter = express.Router()
let mongodb = require('mongodb').MongoClient;
let url = process.env.MONGO_URL

function route(menu) {


    productRouter.route('/')
        .get((req, res) => {
            mongodb.connect(url, (err, dc) => {
                if (err) {
                    res.status(500).send("Error while connecting")
                } else {
                    let dbObj = dc.db('arpnode')
                    dbObj.collection('products').find().toArray((err, result) => {
                        if (err) {
                            res.status(203).send("Error while fetching")
                        }else{
                            res.render('products', { title: 'Products Page', data: products, menu })
                        }
                    })
                }
            })
        })

    productRouter.route('/details')
        .get((req, res) => {
            res.send("Product details")
        })
    return productRouter
}
module.exports = route;