import React from 'react'
import { Button, styled } from "@mui/material";

const CustomButtonOutline = ({
    backgroundColor,
    borderColor,
    color,
    buttonText,
    onclick
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
        border: "2px solid",
        borderColor: borderColor,
        "&:hover": {
          backgroundColor: '#fff',
          color: color,
          borderColor: backgroundColor,
        },
      }));
  return <CustomButton onClick={onclick}>{buttonText}</CustomButton>
}

export default CustomButtonOutline