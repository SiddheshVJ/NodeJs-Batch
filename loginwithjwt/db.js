import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

let mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl)

/*
const username = "<mongodb username>";
const password = "<password>";
const cluster = "<cluster name>";
const dbname = "myFirstDatabase";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);
*/