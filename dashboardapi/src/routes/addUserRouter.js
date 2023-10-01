import { Router } from 'express';
let addUserRoute = Router();
let addUser = require('../controller/addUserController.js')

addUserRoute
    .route('/')
    .get(addUser.addUser)


module.exports = addUserRoute