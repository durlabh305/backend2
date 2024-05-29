const express = require('express')
const router = express.Router();
const userController = require ('../Controller/Usercontroller')
const questionController = require('../Controller/Questioncontroller')

//UserAPI

router.post('/register', userController.register)
router.post('/login', userController.login)
// router.get('/getAllUsers', userController.getAllUsers)

// QuestionAPI

router.post('/addQuestion', questionController.addQuestion)
router.get('getAllQuestion', questionController.getAllQuestions)
module.exports = router