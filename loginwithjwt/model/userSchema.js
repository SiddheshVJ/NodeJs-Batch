import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    role: String
})


mongoose.model('user', userSchema)
// mongoose.model(collection name,data type)

module.exports = mongoose.model('user')