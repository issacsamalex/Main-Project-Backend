import { Card, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from '../../axiosinterceptor';

const ViewGrade = () => {

    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userID = localStorage.getItem('userID');
            const response = await axios.get(`/api/v1/dash/student/user/${userID}`)
            setGrades(response.data.grades)
        }
        fetchData()
    }, [])

  return (
    <>
    <Container>
        <Card variant='outlined' sx={{padding:'30px'}}>
            <Typography variant='h5' gutterBottom>Submission Grades</Typography>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Week 1 submission grade
        </AccordionSummary>
        <AccordionDetails>
          Obtained grades : {grades.map(grade => (grade.week1grade))} out of 10
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Week 2 submission grade
        </AccordionSummary>
        <AccordionDetails>
        Obtained grades : {grades.map(grade => (grade.week2grade))} out of 10
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Week 3 submission grade
        </AccordionSummary>
        <AccordionDetails>
        Obtained grades : {grades.map(grade => (grade.week3grade))} out of 10
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Week 4 submission grade
        </AccordionSummary>
        <AccordionDetails>
        Obtained grades : {grades.map(grade => (grade.week4grade))} out of 10
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Final project report grade
        </AccordionSummary>
        <AccordionDetails>
        Obtained grades : {grades.map(grade => (grade.finalgrade))} out of 10
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Viva voce report grade
        </AccordionSummary>
        <AccordionDetails>
        Obtained grades : {grades.map(grade => (grade.vivagrade))} out of 10
        </AccordionDetails>
      </Accordion>
        </Card>
    </Container>
    </>
  )
}

export default ViewGrade