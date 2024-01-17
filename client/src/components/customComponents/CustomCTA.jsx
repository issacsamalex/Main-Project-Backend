import React from 'react'
import { Button, styled } from "@mui/material";

const CustomCTA = ({
    backgroundColor,
    color,
    buttonText,
    heroBtn,
    guideBtn,
    getStartedBtn,
    onclick,
}) => {

    const CustomButton = styled(Button)(({ theme }) => ({
        backgroundColor: backgroundColor,
        color: color,
        fontWeight: "700",
        fontSize: "14px",
        cursor: "pointer",
        padding: "8px 16px",
        borderRadius: "7px",
        textTransform: "none",
        display: "block",
        border: "2px solid #134987",
        width: "480px",
        "&:hover": {
          backgroundColor: color,
          color: backgroundColor,
          borderColor: backgroundColor,
        },
        [theme.breakpoints.down("md")]: {
          margin: (heroBtn || getStartedBtn) && theme.spacing(0, "auto", 3, "auto"),
          width: (heroBtn || getStartedBtn) && "90%",
        },
        [theme.breakpoints.down("sm")]: {
          marginTop: guideBtn && theme.spacing(3),
          width: guideBtn && "90%",
        },
      }));

  return <CustomButton onClick={onclick}>{buttonText}</CustomButton>
  
}

export default CustomCTA