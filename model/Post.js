const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'studentdetail', 
        required: true,
    },
    comments: [
        {
            text: String,
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'studentdetail',
            },
        },
    ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
