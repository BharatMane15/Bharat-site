const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUser,
} = require("../controllers/userController");
const { isAuthanticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthanticatedUser, updateUserPassword);
router.route("/user/update").put(isAuthanticatedUser, updateUserProfile);

router.route("/logout").get(logout);
router.route("/user").get(isAuthanticatedUser, getUserDetails);
router.route("/users").get(getAllUser);

module.exports = router;
