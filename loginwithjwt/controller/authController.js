import express from 'express';
import { Router } from 'express';
import bodyParser from 'body-parser';
import { Jwt } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const config = require('../config')
import User from '../model/userSchema'

let authControllerRouter = Router();

authControllerRouter.get('/users',async (req, res) => {
    let output = await User.find({})

    console.log(output)
    res.status(200).send(output)
})

module.exports = authControllerRouter