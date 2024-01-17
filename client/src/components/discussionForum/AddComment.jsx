// Import necessary dependencies
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
// import axios from 'axios';
import axios from '../../axiosinterceptor'

// AddComment component
const AddComment = ({ postId, postAuthor }) => {
    const [commentText, setCommentText] = useState('');
    const token = localStorage.getItem('token');
    const userID =localStorage.getItem('userID')
    const handleAddComment = async () => {
        try {
            // Check if the current user is not the author of the post
            if (userID !== postAuthor) {
                const response = await axios.post(`/api/v1/post/${postId}/comments`,
                    {
                        text: commentText,
                        // Use userID as the author of the comment
                        author: userID,
                    },
                    {
                        // Include the authorization token in the headers
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
    
                const newComment = response.data;
                alert('New Comment added', newComment);
                // Reset the comment text after successful comment
                setCommentText('');
            } else {
                alert('Author cannot comment on their own post.');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            // Handle error
        }
    };

    return (
        <Box mt={3}>
            <TextField
                label="Add a comment"
                fullWidth
                margin="normal"
                variant="outlined"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddComment}>
                Add Comment
            </Button>
        </Box>
    );
};

// Export the component
export default AddComment;
