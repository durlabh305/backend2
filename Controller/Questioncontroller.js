const questionData = require('../Modal/Question')

async function addQuestion(req,res) {
    try {
        
        const {question, options, correctAnswer} = req.body
        if(!question||!options||!correctAnswer){
            res.status(400).json({status:'Failed', message: "Something is missing"})
        }

        const questionExist = await questionData.findOne({question})
        if(questionExist){
            res.status(400).json({status:"Failed", message: "Question Already Exist"})
        }

        if(options.length < 2 || options.length > 4){
            res.status(400).json({status: "Failed", message: "Options requirement is not fulfilled"})
        }

        if(!options.includes(correctAnswer)){
            res.status(400).json({status:"Failed", message: "Correct Answer is required"})
        }

        const newQuestion = new questionData({question, options, correctAnswer})
        await newQuestion.save();
        res.status(201).json({status:"success", data: "newQuestion"})
        // Return the added question data

    } catch (error) {
      console.log('Error adding question:', error);
      res.status(500).json({status: "Failed", message: "Internal Server Error"}) // Propagate the error to the caller
    }
  };

  const getAllQuestions = async (req, res)=>{
    try{
        const questions = await questionData.find();
        res.status(200).json({status:"success", data: questions})

    }catch(error){
        console.log(error);
        res.status(500).json({status:"Failed", message:"Internal Server Error"})
    }
  }

  module.exports = {addQuestion, getAllQuestions}