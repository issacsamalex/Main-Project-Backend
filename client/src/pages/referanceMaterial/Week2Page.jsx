import { Container } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player/youtube'




const Week2Page = ({props}) => {
  return (
    <>
    <Container>
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Reference Video (week 2)
        </Typography>
        <ReactPlayer url={props.reference[1].link1} controls ></ReactPlayer>
      </CardContent>
      <CardContent>
        <a href={props.reference[1].link2} target='blank'><Typography variant="body1" color="ButtonText">Additional reference material</Typography></a>
      </CardContent>
      </Card>
    </Box>
    </Container>
    </>
  )
}

export default Week2Page