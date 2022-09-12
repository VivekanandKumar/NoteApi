const { login, register, logout } = require("../controller/UserController");
const { auth } = require("../middlewares/auth");

const userRoutes = require("express").Router();

userRoutes.post("/login", login);
userRoutes.post("/register", register);
userRoutes.get("/logout", auth, logout);

module.exports = { userRoutes };
