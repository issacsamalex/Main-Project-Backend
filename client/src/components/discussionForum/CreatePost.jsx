import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
} from '@mui/material';
// import axios
import axios from '../../axiosinterceptor'

const CreatePost = ({ open, handleClose, setPosts }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const handleCreatePost = async () => {
        try {
            setError(null);
            setLoading(true);

            if (!token) {
                throw new Error('Token is missing');
            }

            const response = await axios.post('/api/v1/post/create', {
                title,
                content,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    

            const newPost = response.data;
            setPosts((prevPosts) => [newPost, ...prevPosts]);

            // Clear the form
            setTitle('');
            setContent('');

            handleClose();
        } catch (error) {
            setError('Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create a New Post</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Content"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleCreatePost}
                    color="primary"
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Post'}
                </Button>
            </DialogActions>
            {error && (
                <Box mt={2}>
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                </Box>
            )}
        </Dialog>
    );
};

export default CreatePost;