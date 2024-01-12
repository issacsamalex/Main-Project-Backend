const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');


router.route('/signup')
    .get(signupController.getAllUsers)
    .post(signupController.createNewUser)



module.exports = router;