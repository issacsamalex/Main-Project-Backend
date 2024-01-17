import { Box, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavBarStudentView from '../navBar/NavBarStudentView';
import ProjectList from '../projectInfo/ProjectList';
import axios from '../../axiosinterceptor';
import axiosInstance from '../../axiosinterceptor'

const StudentDash = () => {
  const accessToken = localStorage.getItem('token');
  const [username, setUserName] = useState('');

  const fetchData = async (accessToken) => {
    try {
      const response = await axios.get('/api/v1/dash/student', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const studentData = response.data;
      setUserName(studentData.username.toUpperCase());
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    fetchData(accessToken);
  }, [accessToken]);

  return (
    <>
      <Box>
        <Container>
          <NavBarStudentView />
          <h1>Welcome {username}</h1>
          <br /><br />
          <ProjectList />
        </Container>
      </Box>
    </>
  );
};

export default StudentDash;
