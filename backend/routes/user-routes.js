const express = require('express');
const {signup,login, verifyToken, updateProfile,getUser} = require('../controllers/user-controller');
const { sendPasswordResetEmail, resetPassword } = require('../controllers/password-reset-controller');

const router = express.Router();

router.post("/signup",signup);
router.post('/login',login);
router.get('/user',verifyToken,getUser)
router.post('/password-reset-request', sendPasswordResetEmail);
router.post('/password-reset', resetPassword);
router.post('/update-profile', verifyToken, updateProfile);

module.exports = router 