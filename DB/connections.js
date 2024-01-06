//1) import mongoose
const mongoose = require('mongoose')

//2) access connection string of mongodb (.env file contents defaultly store into process.env at index.js.)
const connectionString = process.env.DATABASE

//3) connect server with the mongodb (connect method is used)
mongoose.connect(connectionString).then(()=>{
    console.log('mongoDB connected successfully');
}).catch((err)=>{
    console.log(`mongodb connection failed due to: ${err}`);
})


