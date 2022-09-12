const { verify } = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  if (req.cookies.authToken) {
    const token = req.cookies.authToken;
    const userId = await verify(token, process.env.TOKEN_SECRET);
    if (await User.count({ _id: userId.id })) {
      req.userId = userId.id;
      next();
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } else {
    return res.status(500).json({ message: "Access Denied" });
  }
};

module.exports = { auth };
