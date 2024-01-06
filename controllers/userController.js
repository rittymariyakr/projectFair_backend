//  logic to resole the request

//import user model
const users = require('../Model/userSchema')

//import jwt
const jwt = require('jsonwebtoken')

//1) register request
exports.register = async (req, res) => {

    try {
        //extract data from request body- json formate is converted into javascript object by json() at index.js. so that we can directly destructure the keys from the req body
        //destructuring username,mail,pasword from requwstbody. because the data are stored in a req body
        const { username, email, password } = req.body 

        //checking the user is already exist or not //email:email => email
        //it is a communication between 2 applications (server and mongodb), so use async await
        const existUser = await users.findOne({ email }) //findOne returs two things => document present and not present
        if (existUser) {
            //if document is present //406- unprocessible entity
            res.status(406).json('Account Aleady exist... Please Login')
        }
        else {
            //if document is not present
            //need to register
            //1) create an object for the model (our model name is users)
            const newUser = new users({
                // username:username //fisrt username is username in database and second is from request body
                username,
                email,
                password,
                github: "",
                linkedin: "",
                profile: ""

            })
            //add to mongodb - use save method in mongoose to save from server to mongodb //server to mongodb - so use async await
            await newUser.save()

            // response //sending the newUser to client
            res.status(200).json(newUser)

        }

    //in javascript runtime errors are resolved using try-catch block
    } catch (err) {
        res.status(401).json(`Register request failed due to ${err}`)
    }
}

//login request
exports.login = async(req,res)=>{
    console.log(req.body);
    const {email, password} = req.body

    try{
    const existingUser =await users.findOne({email,password})
    console.log(existingUser);
    
    if(existingUser){
        //jwt - to transmit information secretely
        //sign() method- is used to generate token //it has 2 arguments - payload and key
        //payload - is the information that is secretly transmitted
        //key - key based on which the token is generated
        const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")

        //sending as an object because we are sending morethan one data
        res.status(200).json({
           // existinguser:existinguser
           existingUser,
           token
        })
    }
    else{
        res.status(404).json('Invalid Email or Password')
    }
}catch(err){
    res.status(401).json(`Login request failed due to :${err}`);
}

}


//edit profile
exports.editUser = async(req,res)=>{
    const userId = req.payload
    const {username,email,password,github,linkedin,profile} = req.body

    const profileImage = req.file?req.file.filename:profile

    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})

        await updateUser.save()
        res.status(200).json(updateUser)

    } catch(err){
        res.status(401).json(err)
    }
}


