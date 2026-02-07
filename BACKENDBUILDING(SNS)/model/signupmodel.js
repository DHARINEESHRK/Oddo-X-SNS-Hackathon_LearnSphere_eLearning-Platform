const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const signupSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
},{timestamps:true  })

const settoken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role || 'learner'
    },
    process.env.JWT_SECRET || 'learnsphere_secret_key',
    { expiresIn: "1d" }
  );
  return token;
};

const signupModel = mongoose.model("signupdetails",signupSchema)
module.exports = {signupModel, settoken}



