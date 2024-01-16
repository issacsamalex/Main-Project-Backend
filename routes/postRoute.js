const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authToken = require('../middleware/authenticateToken');

router.route('/create')
    .post(postController.createPost)


router.route('/:postId/comments')
    .post(postController.createComment)

    
router.route('/')
    .get(postController.showPost)



module.exports = router;