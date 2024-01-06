//applicable to entire project

const appMidddleware = (req,res,next)=>{
    console.log('inside application middleware');
    next()
}
module.exports = appMidddleware


