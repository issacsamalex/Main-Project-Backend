import React, { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import ProjectInfo from './ProjectInfo';
import axios from '../../axiosinterceptor';
import axiosInstance from '../../axiosinterceptor'

const ProjectList = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [internshipData, setInternshipData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/dash/project');
                const data = response.data;
                setInternshipData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []); 
    const handleOpenDialog = (project) => {
        setSelectedProject(project);
    };

    const handleCloseDialog = () => {
        setSelectedProject(null);
    };


    return (
        <Fragment>
            <Grid container spacing={2}>
                {internshipData.map((intern) => (
                    <Grid item key={intern._id} xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component='img'
                                    height='140'
                                    image={intern.img}
                                    alt={intern.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant='h5' component='div'>
                                        {intern.title}
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        {intern.subtitle}
                                    </Typography>
                                </CardContent>
                                <Button onClick={() => handleOpenDialog(intern)}>
                                    Click Here to know more details
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {selectedProject && (
                <ProjectInfo intern={selectedProject} handleClose={handleCloseDialog} />
            )}
        </Fragment>
    );
};

export default ProjectList;
