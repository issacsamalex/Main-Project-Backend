import React from 'react'
import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {

    const CustomContainer = styled(Container)(({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
        gap: theme.spacing(5),
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          textAlign: "center",
        },
      }));
    
      const IconBox = styled(Box)(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        [theme.breakpoints.down("sm")]: {
          justifyContent: "center",
        },
      }));
    
      const FooterLink = styled("span")(({ theme }) => ({
        fontSize: "16px",
        color: "#7A7A7E",
        fontWeight: "300",
        cursor: "pointer",
        "&:hover": {
          color: "#000",
        },
      }));

  return (
    <>
    <Box sx={{ py: 5 }}>
      <CustomContainer>
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              About Us
            </Typography>

            <FooterLink>Our Mission</FooterLink>
            <br />
            <FooterLink>Meet the Team</FooterLink>
            <br />
            <FooterLink>Contact Us</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Resources
            </Typography>

            <FooterLink>Learning Materials</FooterLink>
            <br />
            <FooterLink>Tech Blogs</FooterLink>
            <br />
            <FooterLink>Video</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Help and Support
            </Typography>

            <FooterLink>FAQs</FooterLink>
            <br />
            <FooterLink>Contact Support</FooterLink>
            <br />
            <FooterLink>Report an Issue</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Connect with Us
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#7A7A7E",
                fontWeight: "500",
                mb: 2,
              }}
            >
              "Your Gateway to Excellence with Our Internship Portal!"
            </Typography>
            <IconBox>
                <FaFacebook style={{ cursor: "pointer" }} />
                <FaTwitter style={{ cursor: "pointer" }} />
                <FaLinkedin style={{ cursor: "pointer" }} />
            </IconBox>

          </Box>
      </CustomContainer>
    </Box>
    </>
  )
}

export default Footer