import { Container } from '@mui/material'
import React, { useState, useRef } from 'react'
import JoditEditor from 'jodit-react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomButton from '../../components/customComponents/CustomButton';
import axios from 'axios';
import toast from 'react-hot-toast';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );


const FinalReportSubmission = ({props}) => {

    const editor = useRef(null);
    const [content, setContent] = useState('');

    const onSubmit = async () => {
      if(content){
        const userID = localStorage.getItem('userID')
        await axios.put(`http://localhost:3001/api/v1/dash/student/update/${userID}`, {finalsub: content})
        .then((response)=>{
        toast.success(response.data.message, {position:"top-right"});
        })
        setContent('');
        window.location.reload();
      }else{
        toast.error('Empty content', {position:"bottom-right"});
      }
    }

  return (
    <>
    <Container>
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Final Project Report Submission
        </Typography>
      </CardContent>
      <CardContent>
        <a href={props.finalreport} target='blank'><Typography variant="body1" color="ButtonText">Sample Project Report</Typography></a>
      </CardContent>
      <CardContent>
        <Typography>What all to submit?</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {bull} Google Docs link
      </Typography>
      </CardContent>
      <JoditEditor
      ref={editor}
      value={content}
      onChange={newContent => setContent(newContent)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '30px'}}>
      <CustomButton
      backgroundColor="#134987"
      color="#fff"
      buttonText="Submit"
      onclick={onSubmit}
      />
      </Box>
      </Card>
    </Box>
    </Container>
    </>
  )
}

export default FinalReportSubmission