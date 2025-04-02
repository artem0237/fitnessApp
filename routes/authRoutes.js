const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/login', authMiddleware.redirectIfAuth, authController.getLogin);

router.post('/login', authMiddleware.redirectIfAuth, authController.postLogin);

router.get('/register', authMiddleware.redirectIfAuth, authController.getRegister);

router.post('/register', authMiddleware.redirectIfAuth, authController.postRegister);

router.get('/logout', authController.logout);

module.exports = router;