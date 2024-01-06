// setup path to resolve request

//1) import express module
const express = require('express')

// import user controller
const userController = require('../controllers/userController')

//import project controller
const projectController = require('../controllers/projectController')

//import jwtmiddleware
const jwtMiddleware = require('../Middleware/jwtMiddleware')

//import multer
const multerConfig = require('../Middleware/multerMiddleware')

//2) create an object for router class inside express module
const router = new express.Router()

//3) setup path to resolve request
//syntax - router.httprequest('path to resolve',()=>{how to resolve})
//a) register
router.post('/user/register', userController.register)

//b) Login
router.post('/user/login', userController.login)

//c) add projects
router.post('/projects/add', jwtMiddleware, multerConfig.single('projectImage'), projectController.addproject)

//d) home project //home project can view all users who are logged in and not loggedin, so jwtmiddleware is not needed
router.get('/projects/home-project', projectController.gethomeProjects)

//e)get all project //all projects can view only if a user logged in, so jwtmiddleware is needed
router.get('/projects/all-project', jwtMiddleware, projectController.getAllProjects)

//f)userProject
router.get('/projects/user-project', jwtMiddleware, projectController.allUserProjects)

//g) editproject
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)

//h) delete project
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProject)

//i) edit profile //can give any path //we need token to verify user, becoz only loginned user can update their profile, so given jwtMiddleware //uploaded content - multer // only one uploaded content. so given single, that is profile
router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.editUser)

//4) export router
module.exports = router