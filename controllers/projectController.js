
//import project model
const projects = require('../Model/projectSchema')

exports.addproject = async (req, res) => {
    console.log("inside project add controller");
    const userId = req.payload
    console.log(userId);

    const projectImage = req.file.filename
    console.log(projectImage);

    const { title, language, github, website, overview } = req.body
    console.log(`${title}, ${language},${github},${website},${overview},${userId}`);

    try {
        //checking the project is already uploaded or not based on github link
        const ExistingProject = await projects.findOne({ github })
        if (ExistingProject) {
            res.status(401).json('project already exist... Please upload a new project')
        }
        else {
            const newProject = new projects({
                title, language, github, website, overview, projectImage, userId
            })
            await newProject.save()
            res.status(200).json(newProject)

        }
    }
    catch (err) {
        res.status(401).json(`Request failed due to ${err}`)

    }
}


// homeprojects
exports.gethomeProjects = async (req, res) => {
    try {
        const homeprojects = await projects.find().limit(3)
        res.status(200).json(homeprojects)
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}



//allproject
exports.getAllProjects = async (req, res) => {
    const search = req.query.search
    console.log(search);
    const query = {
        language:{
            //regular expression, optons:'i': it removes the case sensitivity
            $regex:search,
            $options:'i'
        }
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}
//getUserProject
exports.allUserProjects = async (req, res) => {
    //get id from the token
    const userId = req.payload
    try {
        const userProjects = await projects.find({ userId })
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}

//edit project
exports.editUserProject = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {title,language,github,website,overview,projectImage} = req.body
    const uploadedProjectImage = req.file?req.file.filename:projectImage 

    try{
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectImage:uploadedProjectImage,userId},{new:true})

        //to save updated content in mongodb
        await updateProject.save()
        res.status(200).json(updateProject)

    }catch (err){
        res.status(401).json(err)
    }

}

//delete project
exports.deleteProject = async(req,res)=>{
    const {id} = req.params

    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)

    }catch(err){
        res.status(401).json(err)
    }
}


