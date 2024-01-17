import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Container,
    Paper,
    Button,
} from '@mui/material';
import AddComment from './AddComment';
import CreatePost from './CreatePost';
import axios from '../../axiosinterceptor'

const ViewPost = () => {
    const [posts, setPosts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/v1/post');
                const allPosts = response.data;
                setPosts(allPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <Container>
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Discussion Forum
                    </Typography>
                    <List>
                        {posts.map((post) => (
                            <ListItem key={post._id} style={{ marginBottom: '20px' }}>
                                <ListItemText
                                    primary={<Typography variant="h6">{post.title}</Typography>}
                                    secondary={
                                        <>
                                            <Typography
                                                component="div"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {post.content}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Author: {post.author && post.author.username}
                                            </Typography>
                                            {post.comments.length > 0 && (
                                                <>
                                                    {post.comments.map((comment) => (
                                                        <ListItem key={comment._id}>
                                                            <Typography
                                                                component="div"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                
                                                                Reply: {comment.text}
                                                            </Typography>
                                                            <br />
                                                        </ListItem>
                                                    ))}
                                                </>
                                            )}






                                            <AddComment postId={post._id} postAuthor={post.author && post.author.username} />
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenDialog}
                        style={{ marginTop: '20px' }}
                    >
                        Add Post
                    </Button>

                    <CreatePost
                        open={openDialog}
                        handleClose={handleCloseDialog}
                        setPosts={setPosts}
                    />
                </Paper>
            </Container>
        </>
    );
};

export default ViewPost;
