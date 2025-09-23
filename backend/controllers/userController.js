import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


//function to create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}


//route for user login
const loginUser = async (req, res) => {

}





// route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        message: "User already exists",
        success: false,
      });
    }

    // validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        message: "Invalid email",
        success: false,
      });
    }

    // check password length
    if (password.length < 8) {
      return res.json({
        message: "Password must be at least 8 characters",
        success: false,
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    // generate token
    const token = createToken(newUser._id);

    return res.json({
      message: "Register successful",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error in register",
      success: false,
      error,
    });
  }
};








//route for admin login
const adminLogin = async (req, res) => {

}


export { loginUser, registerUser, adminLogin };