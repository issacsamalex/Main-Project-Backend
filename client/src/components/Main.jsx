import React from 'react'
import { Box, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";


import heroImg from "../media/hero-section-illustration.png";
import Navbar from './navBar/Navbar';
import Footer from './Footer';

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(10),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(7),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));



const main = () => {
  return (
    <>
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "100vh" }}>
      <Container>
        <Navbar/>
      <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 5,
                mb: 4,
              }}
            >
              Welcome to ICTAK Internship Portal
            </Typography>
            <Title variant="h1">
            Unlock Your Potential: Dive into Real-world Learning.
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              Transforming Education into Experience: Your Gateway to Innovative Internship Opportunities.
            </Typography>
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{ maxWidth: "100%", marginBottom: "30px", marginTop: "60px" }}
            />
          </Box>
        </CustomBox>
        <Footer/>
      </Container>
    </Box>
    </>
  )
}

export default main