const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');


router.route('/')
    .get(projectController.getAllProjects)






module.exports = router;