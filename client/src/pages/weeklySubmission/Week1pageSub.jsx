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

const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Submission section (week 1) 
        </Typography>
      </CardContent>
      <CardContent>
        <Typography>What all to submit?</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {bull} Github Repo link
      </Typography>
      </CardContent>
        
    </React.Fragment>
  );



const Week1pageSub = () => {

    const editor = useRef(null);
    const [content, setContent] = useState('');

    const onSubmit = async () => {
      if(content){
        const userID = localStorage.getItem('userID')
      await axios.put(`http://localhost:3001/api/v1/dash/student/update/${userID}`, {week1sub: content})
      .then((response)=>{
        toast.success(response.data.message, {position:"top-right"});
      })
      setContent('');
      }else{
        toast.error('Empty content', {position:"bottom-right"});
      }
    }

  return (
    <>
    <Container>
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}
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

export default Week1pageSub