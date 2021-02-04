const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");
const { postLogin, postLogout, postLogoutAll } = require("../controllers/authController");

// login user
router.post("/users/login", postLogin);

// logout current user
router.post("/users/logout", auth, postLogout);

// delete all user's tokens
router.post("/users/logoutAll", auth, postLogoutAll);

module.exports = router;
