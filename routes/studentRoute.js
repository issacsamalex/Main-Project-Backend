const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Protected route to get student data
router.route('/')
    .get(studentController.getAllUserData);

module.exports = router;
