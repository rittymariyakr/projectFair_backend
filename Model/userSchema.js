//1) import mongoose
const mongoose = require('mongoose')

//4) create scheme
//create schema using the schema class in the mongoose library 
const userScheme = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'must be atleast 3 characters but got {VALUE}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        //if the input value is not a proper email id then it throw the error and return invalid email 
        //isEmail is the method in validator which check wether the input is proper emailid or not
        validator(value){
            if(!validator.isEmail(value))
                {throw new Error('Invalid Email')}
        }
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }

})

//2) create model //two arguments => collection name, schema //'users' is collection name and give it as string. //userScheme is scheme name
const users = mongoose.model("users",userScheme)

//3) export model //it will import at controller
module.exports = users




