import userModel from "../models/userModel.js";
import validator from "validator";
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
  } catch (error) {}
};

// route for admin user
const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
// endpoints to be done 55543
