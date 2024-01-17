import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ProjectOverview from '../../pages/projectOverview/ProjectOverview';
import { LuFiles } from "react-icons/lu";
import { BsCalendar2Week } from "react-icons/bs";
import { GoProject } from "react-icons/go";
import { CgDetailsMore } from "react-icons/cg";
import { MdFormatListBulleted } from "react-icons/md";
import logoImg from "../../media/main-logo.png";
import Week1Page from '../../pages/referanceMaterial/Week1Page';
import CustomButton from '../customComponents/CustomButton';
import {
    styled,
  } from "@mui/material";
import CustomButtonOutline from '../customComponents/CustomButtonOutline';
import Week2Page from '../../pages/referanceMaterial/Week2Page';
import Week3Page from '../../pages/referanceMaterial/Week3Page';
import Week4Page from '../../pages/referanceMaterial/Week4Page';
import WeeklySubmissionIndex from '../../pages/weeklySubmission/WeeklySubmissionIndex';
import Week1pageSub from '../../pages/weeklySubmission/Week1pageSub';
import Week2pageSub from '../../pages/weeklySubmission/Week2pageSub';
import Week3pageSub from '../../pages/weeklySubmission/Week3pageSub';
import Week4pageSub from '../../pages/weeklySubmission/Week4pageSub';
import FinalReportSubmission from '../../pages/finalReport/FinalReportSubmission';
import axios from '../../axiosinterceptor';
import axiosInstance from '../../axiosinterceptor'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import VoceSubmission from '../../pages/vivaVoce/VoceSubmission';
import DiscussionForum from '../discussionForum/DiscussionForum';
import ViewGrade from '../../pages/grades/ViewGrade';


const drawerWidth = 240;

const Sidenav = () => {
    const navigate=useNavigate()
    // const [projectId, setProjectId] = useState('')
    

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
    };
    useEffect(() => {
        const fetchData = async () => {
            const userID = localStorage.getItem('userID');
            const response = await axios.get(`/api/v1/dash/student/user/${userID}`)
            const projectId = response.data.project_id
            const project = await axios.get(`/api/v1/dash/project/selected/${projectId}`)
            setProjectDetails(project.data)
            setEnrolledDate(response.data.enrolled_date)
            setFinalProject(response.data.finalsub)
            const enrolledDate = new Date(response.data.enrolled_date);
            const currentDate = new Date();
            const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
            const totalWeeks = Math.ceil((currentDate - enrolledDate) / millisecondsInWeek);
            setTotalWeeks(totalWeeks);
        }
        fetchData();
    },[])

    const NavbarLogo = styled("img")(({ theme }) => ({
        cursor: "pointer",
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      }));
    
    const [enrolledDate, setEnrolledDate] = useState('');
    const [projectDetails, setProjectDetails] = useState('');
    const [menuData, setMenuData] = useState("ProjectOverview");
    const [currentWeek, setCurrentWeek] = useState(1);
    const [totalWeeks, setTotalWeeks] = useState(4);
    const [finalProject, setFinalProject] = useState('');

    const handleDisplaySubmission1 = () => {
      if(isSubmissionPeriod(1)){
        setMenuData("submissionweek1")
      }else{
        toast.error('Submission is closed for this week', {position:"bottom-right"});
      }
    };
    const handleDisplaySubmission2 = () => {
      if(isSubmissionPeriod(2)){
        setMenuData("submissionweek2")
      }else{
        toast.error('Submission is closed for this week', {position:"bottom-right"});
      }
    };
    const handleDisplaySubmission3 = () => {
      if(isSubmissionPeriod(3)){
        setMenuData("submissionweek3")
      }else{
        toast.error('Submission is closed for this week', {position:"bottom-right"});
      }
    };
    const handleDisplaySubmission4 = () => {
      if(isSubmissionPeriod(4)){
        setMenuData("submissionweek4")
      }else{
        toast.error('Submission is closed for this week', {position:"bottom-right"});
      }
    };

    const handleDisplayFinalSubmission = () => {
      if(isSubmissionPeriod(4)){
        setMenuData("finalreportsubmission")
      }else{
        toast.error('Report submission is closed for this week', {position:"bottom-right"});
      }
    };

    const handleDisplayVivaVoce = () => {
      if(finalProject){
        setMenuData("vivavocesubmission")
      }else{
        toast.error('Project report is not submitted', {position:"bottom-right"});
      }
    };

    const isSubmissionPeriod = (weekNumber) => {
      const now = new Date();
      const startOfWeek = new Date(enrolledDate);
      startOfWeek.setDate(startOfWeek.getDate() + (weekNumber - 1) * 7);
  
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
  
      return now >= startOfWeek && now <= endOfWeek;
    };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar className='sidebar' sx={{ justifyContent: 'space-between'}}>
          <Typography variant="h6" noWrap component="div">
            {projectDetails.title}
          </Typography>
          <Box sx={{display: 'flex', gap: "40px"}}>
          <Box sx={{display: 'flex', gap: "10px"}}>
          <CustomButtonOutline
            backgroundColor="none"
            borderColor= "#137d87"
            color="#137d87"
            buttonText="Discussion Forum"
            onclick={()=> setMenuData("discussionforum")}
            />
            <CustomButtonOutline
            backgroundColor="none"
            borderColor= "#137d87"
            color="#137d87"
            buttonText="View Grades"
            onclick={()=> setMenuData("viewgrade")}
            />
          </Box>
          <CustomButton
          backgroundColor="#134987"
          color="#fff"
          buttonText="Logout"
          onclick={handleLogout}
          />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <NavbarLogo sx={{width: "150px", marginInline: '44px'}} src={logoImg} alt="logo" />

        <Divider />
        <List>
        <ListItem disablePadding>
              <ListItemButton onClick={()=> setMenuData("ProjectOverview")}>
                <ListItemIcon>
                <CgDetailsMore />
                </ListItemIcon>
                <ListItemText primary={'Project Overview'} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <LuFiles />
                </ListItemIcon>
                <ListItemText primary={'Reference Material'} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=> setMenuData("referenceWeek1")}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText secondary={'Week 1'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={()=> setMenuData("referenceWeek2")}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText secondary={'Week 2'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={()=> setMenuData("referenceWeek3")}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText secondary={'Week 3'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={()=> setMenuData("referenceWeek4")}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText secondary={'Week 4'} />
              </ListItemButton>
            </ListItem>

        </List>
        <Divider />
        <List>
        <ListItem disablePadding>
              <ListItemButton onClick={()=> setMenuData("weeklysubmissionindex")}>
                <ListItemIcon>
                <BsCalendar2Week />
                </ListItemIcon>
                <ListItemText primary={'Weekly Submission'} />
              </ListItemButton>
            </ListItem>

            
              <ListItem disablePadding>
              <ListItemButton onClick={handleDisplaySubmission1}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText secondary={'Week 1'} />
              </ListItemButton>
            </ListItem>
            
            
              <ListItem disablePadding>
              <ListItemButton onClick={handleDisplaySubmission2}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText secondary={'Week 2'} />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton onClick={handleDisplaySubmission3}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText secondary={'Week 3'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleDisplaySubmission4}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText secondary={'Week 4'} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem disablePadding>
              <ListItemButton onClick={handleDisplayFinalSubmission}>
                <ListItemIcon>
                <GoProject />
                </ListItemIcon>
                <ListItemText primary={'Final Project Report Submission'} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem disablePadding>
              <ListItemButton onClick={handleDisplayVivaVoce}>
                <ListItemIcon>
                <MdFormatListBulleted />
                </ListItemIcon>
                <ListItemText primary={'Viva Voce Format'} />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        
        {menuData === "ProjectOverview" && <ProjectOverview props={projectDetails} enrolledDate={enrolledDate}/>}
        {menuData === "referenceWeek1" && <Week1Page props={projectDetails}/>}
        {menuData === "referenceWeek2" && <Week2Page props={projectDetails}/>}
        {menuData === "referenceWeek3" && <Week3Page props={projectDetails}/>}
        {menuData === "referenceWeek4" && <Week4Page props={projectDetails}/>}
        {menuData === "weeklysubmissionindex" && <WeeklySubmissionIndex props={projectDetails}/>}
        {menuData === "submissionweek1" && <Week1pageSub/>}
        {menuData === "submissionweek2" && <Week2pageSub/>}
        {menuData === "submissionweek3" && <Week3pageSub/>}
        {menuData === "submissionweek4" && <Week4pageSub/>}
        {menuData === "finalreportsubmission" && <FinalReportSubmission props={projectDetails}/>}
        {menuData === "vivavocesubmission" && <VoceSubmission props={projectDetails}/>}
        {menuData === "discussionforum" && <DiscussionForum/>}
        {menuData === "viewgrade" && <ViewGrade/>}
      </Box>
    </Box>
  )
}

export default Sidenav