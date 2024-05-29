const User = require('../Modal/User');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try {
        const { username, password, confirmPassword, email } = req.body;

        if (!username || !password || !confirmPassword || !email) {
            return res.status(400).json({ status: "Failed", msg: "Please enter username, email, password, and confirm password" });
        }

       
        if (password !== confirmPassword) {
            return res.status(400).json({ status: "Failed", msg: "Passwords do not match" });
        }

   
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ status: "Failed", msg: "Username already exists" });
        }

      
        const newUser = new User({ username, email, password });
        await newUser.save();

        
        return res.status(201).json({ status: "success", data: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Failed", msg: "Internal server error" });
    }
}

//=================================================login================================================//
async function login(req, res) {
    try {
        const { username, password } = req.body;

     
        if (!username || !password) {
            return res.status(400).json({ status: "Failed", msg: "Please enter username and password" });
        }

        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ status: "Failed", msg: "User not found" });
        }

        
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: "Failed", msg: "Invalid password" });
        }

        
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                project: "1",
                Title: "Mini Blogging Site"
            }, 
            "This is secret key"
        );

        res.setHeader("x-auth-token", token);
        return res.status(200).send({ status: true, generatedToken: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Failed", msg: "Internal server error" });
    }
}

module.exports = { register, login };
