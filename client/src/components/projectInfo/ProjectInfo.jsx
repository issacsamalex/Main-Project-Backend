import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosinterceptor';
import axiosInstance from '../../axiosinterceptor'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const ProjectInfo = ({ intern, handleClose }) => {
    const [project, setProject] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const navigate=useNavigate()
    useEffect(() => {
        console.log('Updated Project:', project);
    }, [project]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleProjectSubmit = async () => {
        setProject(intern._id);
        handleCloseDialog();
        localStorage.setItem('selectedProject', intern._id);
        const userID = localStorage.getItem('userID')
        await axios.put(`/api/v1/dash/student/update/${userID}`, {project_id: intern._id, enrolled_date: Date.now()})
        navigate('/project-dash')
        
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={true}
        >
            <DialogTitle sx={{ m: 1, p: 1 }} id='customized-dialog-title'>
                <Typography variant='h3'>{intern.title}</Typography>
            </DialogTitle>
            <IconButton
                aria-label='close'
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                    src={intern.img}
                    height={200}
                    alt={intern.title}
                />
            </DialogContent>
            <DialogContent>
                <Typography gutterBottom>{intern.description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOpenDialog}>
                    Select
                </Button>
            </DialogActions>
            {/* Dialog for user verification of project */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Select Project</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to select this project, once chosen can't be changed?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                    <Button onClick={handleProjectSubmit}>
                        Select
                    </Button>
                </DialogActions>
            </Dialog>
        </BootstrapDialog>
    );
};

export default ProjectInfo;
