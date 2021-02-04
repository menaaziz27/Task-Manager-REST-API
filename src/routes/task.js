const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");

const {
	createTask,
	getTasks,
	getTask,
	updateTask,
	deleteTask,
} = require("../controllers/taskController");

// =========Tasks Routes ============

// create a task
router.post("/tasks", auth, createTask);

// Get all tasks
// GET /tasks?completed=true&limit=1
router.get("/tasks", auth, getTasks);

// Get single task
router.get("/tasks/:id", auth, getTask);

// update a task
router.patch("/tasks/:id", auth, updateTask);

// delete a task
router.delete("/tasks/:id", auth, deleteTask);

module.exports = router;
