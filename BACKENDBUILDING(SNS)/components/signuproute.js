const loginmodel = require("../model/loginmodel");
const { settoken } = require("../model/signupmodel");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // 1. Check if user already exists
    const existingUser = await loginmodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    // 2. Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Save user
    const newUser = new loginmodel({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // 4. Generate JWT and return
    const token = settoken(newUser);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: 'learner'
      }
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)[0].message
      });
    }

    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup };
