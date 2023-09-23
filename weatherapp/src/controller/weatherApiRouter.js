let express = require('express')
let weatherApiRouter = express.Router()


function router() {
    weatherApiRouter.route('/')
        .get((req, res) => {
            res.send("<h1>Delhi</h1>")
        })
    return weatherApiRouter;
}

module.exports = router