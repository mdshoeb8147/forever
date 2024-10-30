import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// route for user login
const loginUser = async (req, res) => {};
// route for user register

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validate email format or password

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter valid email" });
    }
    if (password.length < 0) {
      return res.json({
        success: false,
        message: "please enter strong password",
      });
    }

    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route for admin user
const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
// endpoints to be done 55543
