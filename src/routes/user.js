const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			cb(new Error('please upload an image.'));
		}

		cb(null, true);
	},
});

const {
	createUser,
	getMe,
	updateUser,
	deleteUser,
	uploadAvatar,
	deleteAvatar,
	getAvatar,
} = require('../controllers/userController');

// =========== Users Routes ============
// create a user
router.post('/users', createUser);

// Get me
router.get('/users/me', auth, getMe);

// update user
router.patch('/users/me', auth, updateUser);

// delete a user
router.delete('/users/me', auth, deleteUser);

router.post(
	'/users/me/avatar',
	auth,
	upload.single('avatar'),
	uploadAvatar,
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

router.delete('/users/me/avatar', auth, deleteAvatar);

router.get('/users/:id/avatar', getAvatar);
module.exports = router;
