const Post = require('../model/Post')
const jwt = require('jsonwebtoken')
const User = require('../model/Student_details')
const mongoose = require('mongoose')

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const token = req.headers.authorization;

        // Check if the token is present
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - Missing token' });
        }

        try {
            // Remove the "Bearer " prefix
            const tokenWithoutPrefix = token.replace('Bearer ', '');

            // Attempt to decode and verify the token
            const decodedToken = jwt.verify(tokenWithoutPrefix, process.env.ACCESS_TOKEN_SECRET);
            const userId = decodedToken.userId;
            console.log('Decoded Token:', decodedToken);

            // Create a new post
            const newPost = new Post({
                title,
                content,
                author: userId,
            });

            // Save the post to the database
            const savedPost = await newPost.save();

            // Fetch author details using userId
            const authorDetails = await User.findById(userId);

            // Return the created post along with the author details
            return res.status(201).json({ ...savedPost.toObject(), author: authorDetails });
        } catch (verifyError) {
            // Handle verification errors (invalid token, expired token, etc.)
            console.error('Error verifying token:', verifyError);
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const token = req.headers.authorization;
        const postId = req.params.postId;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - Missing token' });
        }

        try {

            const tokenWithoutPrefix = token.replace('Bearer ', '');


            const decodedToken = jwt.verify(tokenWithoutPrefix, process.env.ACCESS_TOKEN_SECRET);
            const userId = decodedToken.userId;
            console.log("Decoded Token:", decodedToken)
            console.log("UserID:", userId)

            const post = await Post.findById(postId).populate('comments.author');
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            const comment = {
                text,
                author: userId,
            };

            post.comments.push(comment);
            await post.save();

            // Fetch the updated post with populated comments.author
            const updatedPost = await Post.findById(postId).populate('comments.author');

            console.log('Updated Post:', updatedPost);

            return res.status(201).json({ message: 'Comment created successfully', post: updatedPost });

        } catch (saveError) {
            console.error('Error saving post:', saveError);
            return res.status(500).json({ error: 'Internal Server Error - Unable to save post' });
        }
    } catch (verifyError) {
        // Handle verification errors (invalid token, expired token, etc.)
        console.error('Error verifying token:', verifyError);
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};


const showPost = async (req, res) => {
    try {
        const allPosts = await Post.find().populate('author');
        res.json(allPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createPost, showPost, createComment }