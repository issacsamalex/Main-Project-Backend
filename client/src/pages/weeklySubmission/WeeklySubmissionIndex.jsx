import { Container } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const WeeklySubmissionIndex = ({props}) => {
  return (
    <>
     <Container>
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Weekly submission plan
        </Typography>
        <iframe title='docs' src= {props.weeklyreport} width="640" height="680" allow="autoplay"></iframe>
      </CardContent>
      </Card>
    </Box>
    </Container>
    </>
  )
}

export default WeeklySubmissionIndex