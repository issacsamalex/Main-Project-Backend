import React from 'react';
import Box from "@mui/material/Box";
import logoImg from "../../media/main-logo.png";
import { Container } from "@mui/system";
import CustomButton from "../customComponents/CustomButton";
import {
  styled,
} from "@mui/material";
import {  useNavigate } from 'react-router-dom';

const NavBarStudentView = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  

  

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NavbarLogo sx={{ width: "150px" }} src={logoImg} alt="logo" />
        </Box>

        
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <CustomButton
          backgroundColor="#134987"
          color="#fff"
          buttonText="Log out"
          onclick={handleLogout}
        />
      </Box>
    </NavbarContainer>
  );
};

export default NavBarStudentView;
