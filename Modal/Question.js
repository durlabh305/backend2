const mongoose = require('mongoose');

// Define the schema for a question
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    text:{
      type: String,
    },
    imageUrl:{
      type: String,
    },
    category:{
      type: String,
      enum:['text','imageUrl', 'textAndImageUrl'],
      required: true
    }
    
  },
  correctAnswer: {
    type: String,
    required: true
  }
});

//All options must contain only one category'

// Create a Question model using the schema
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
