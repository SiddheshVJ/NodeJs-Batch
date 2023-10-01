import { Router } from 'express';
let categoryRouter = Router();
import { MongoClient as mongodb } from 'mongodb';
let url = process.env.MONGO_URL;

function router(menu) {
    categoryRouter
        .route('/')
        .get((req, res) => {
            mongodb.connect(url, function (err, dc) {
                if (err) {
                    res.status(500).send('Error While connecting')
                } else {
                    let dbObj = dc.db('arpnode');
                    dbObj.collection('category').find().toArray(function (err, category) {
                        if (err) {
                            res.status(203).send('Error While Fetching')
                        } else {
                            res.render('category', { title: 'Category Page', data: category, menu })
                        }
                    })
                }
            })
        })

    categoryRouter.route('/details')
        .get((req, res) => {
            res.send('Category Details')
        })

    return categoryRouter
}



export default router