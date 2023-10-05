import express from 'express';
import { Router } from 'express';
import bodyParser from 'body-parser';
import { Jwt } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from './config';
import user from '../model/userSchema'

let authControllerRouter = Router();

authControllerRouter.use(bodyParser.urlencoded({ extended: true }))
authControllerRouter.use(bodyParser.json)

module.exports = router