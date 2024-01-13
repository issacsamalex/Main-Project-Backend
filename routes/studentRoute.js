const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Protected route to get student data
router.route('/')
    .get(studentController.getAllUserData);

router.route('/user/:id')
    .get(studentController.getOneUser);

router.route('/update/:id')
    .put(studentController.updateUser);

module.exports = router;
