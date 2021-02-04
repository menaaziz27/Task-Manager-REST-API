const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");

const { createUser, getMe, updateUser, deleteUser } = require("../controllers/userController");

// =========== Users Routes ============
// create a user
router.post("/users", createUser);

// Get me
router.get("/users/me", auth, getMe);

// update user
router.patch("/users/me", auth, updateUser);

// delete a user
router.delete("/users/me", auth, deleteUser);

module.exports = router;
