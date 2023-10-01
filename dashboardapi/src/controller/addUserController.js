import {dbConnect} from './dbController'


export function addUser(req,res){
    res.status(200).send("<h1> Add User in controller</h1>")
}