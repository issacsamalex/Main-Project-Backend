import { Container } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import moment from 'moment'

const ProjectOverview = ({props, enrolledDate}) => {

  const outputDate = moment(enrolledDate).format('L')
  const subDate = moment(enrolledDate).add(28, 'days').calendar()

  return (
    <>
    <Container>
    <Card sx={{ }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="340"
        image={props.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardContent>
        <a href={props.docs} target='blank'><Typography variant="body1" color="ButtonText">Detailed documentation of the project:</Typography></a>
      </CardContent>
      <CardContent>
        <Typography variant="body1" color="GrayText">Date of enrollment: {outputDate}</Typography>
        <Typography variant="body1" color="darkgoldenrod">Date of Final Project Report Submission: {subDate}</Typography>
      </CardContent>
    </Card>
    </Container>
    </>
  )
}

export default ProjectOverview