const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    confirmpassword: {type: String, required: true}
})

userSchema.methods.hashPassword = async function() {
    this.password = await bcrypt.hash(this.password, 10);
  };
  
  userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };
  
const User = mongoose.model('User', userSchema);

module.exports = User;