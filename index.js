//1) import dotenv
//config() method Loads .env file contents into process.env by default.
require('dotenv').config()

//2) import express
const express = require('express')

//3) import cors
const cors = require('cors')

// import router
const router = require('./Routers/router')

//import connection.js file
require('./DB/connections')

//import application specific middleware
// const appMidddleware = require('./Middleware/appMiddleware')


//4) create server
// Creates an Express application. The express() function is a top-level function exported by the express module.
const pfserver = express()

//5) use cors in server to connect frontend and backend(becz they are running in diff ports)
pfserver.use(cors())

//6) Returns middleware that only parses json to javascript object
// .json is for converting json format data into javascript object
pfserver.use(express.json())

// pfserver.use(appMidddleware)

// use of router by server
pfserver.use(router)

//use uploads folder for images
//first argument - the way in which other application should use this folder
//sec argument - export that folder - express.static
pfserver.use('/uploads',express.static('./uploads'))

//7) customize the port - by default server running in port no.- 3000 and frontend is also in 3000. so, for avoiding clash between customizing them
const PORT = 4000 || process.env

//8) to run server 
pfserver.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

//9) get request (first argument is path (/) )
pfserver.get('/',(req,res)=>{
    res.send(`<h1 style="color:blue"> project fair server running successfully and ready to accept request from client</h1>`)
})


