const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address"
      ]
    },

    password: {
      type: String,
      required: [true, "Password is required"]
      // No regex here — password is bcrypt-hashed before storage
    },

    role: {
      type: String,
      enum: ['admin', 'instructor', 'learner'],
      default: 'learner'
    }
  },
  { timestamps: true }
);

const loginModel = mongoose.model("logindetails", loginSchema);
module.exports = loginModel;
