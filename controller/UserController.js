const User = require("../models/User");
const { compare, hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");

// user Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await User.count({ email })) {
      // match the password
      const user= await User.findOne({email});
      const passMatched = await compare(password, user.password);
      if (passMatched) {
        // generate the jwt token
        const token = await sign({ id: user._id }, process.env.TOKEN_SECRET);
        res.cookie("authToken", token, { httpOnly: true });
        return res.status(200).json({ status:200,message: "Logged In" });
      } else {
        return res.status(504).json({ status:504,message: "Bad Credentials !!" });
      }
    } else {
      return res.status(404).json({ message: "User Not Found !!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// user Register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.count({ email })) {
      return res.status(500).json({ message: "User already exist !!" });
    } else {
      const pass = await hash(password, 10);
      const newUser = {
        name,
        email,
        password: pass,
      };
      await User.create(newUser);
      return res.status(200).json({ message: "User Registered.." });
    }
  } catch (error) {
    return console.log(error.message);
  }
};

const logout = (req,res)=>{
  res.clearCookie('authToken');
  return res.status(200).json({message:"Logged Out."})
}
module.exports = { login, register, logout };
