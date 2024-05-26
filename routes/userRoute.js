const express = require('express');

const router = express.Router();

const { userSignup, userLogin, userLogout } = require('../controller/userController');
const { validateUserSignup, validateUserLogin } = require('../middleware/userValidator');
const upload = require('../config/multerConfig');

router.post('/', upload.single('profilePicture'), validateUserSignup, userSignup);
router.post('/login', validateUserLogin, userLogin);
// router.get('/logout', userLogout);

module.exports = router;
