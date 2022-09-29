const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', authController.putSignup);

router.post('/login', authController.postLogin);

module.exports = router;
