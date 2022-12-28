const express = require("express");
const router = express.Router();

//controller
const {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
} = require("../controllers/UserController");
// ???? const { validate } = require("../models/User");

//middleware
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

//Routes (middleware validate fica no meio)
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put(
  "/",
  authGuard,
  imageUpload.single("profileImage"),
  userUpdateValidation(),
  validate,
  update
);
router.get("/:id", getUserById);

module.exports = router;
