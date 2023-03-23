import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from "react";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [items, setItems] = useState(false);
  const [changer, setChanger] = useState(true);



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('login'));
    if (user) {
     setItems(true);
    }else{
      setItems(false);
    }
  }, [changer]);


  const Logout = () =>{
    localStorage.removeItem("login");
    localStorage.removeItem("patient");
    setChanger(!changer);
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Button a color="inherit" onClick={()=>navigate("/")}>
            Home
          </Button>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Button a color="inherit" onClick={()=>navigate("/doctor_list")}>
            Doctor
          </Button>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Button a color="inherit" onClick={()=>navigate("/consult")}>
            Consult
          </Button>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Button a color="inherit" onClick={()=>navigate("/appointment")}>
            Appointments
          </Button>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Button a color="inherit" onClick={()=>navigate("/hospital")}>
            Hospital
          </Button>
        </IconButton>
      </MenuItem>
      {items?
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Button a color="inherit"
          onClick={Logout}>
            Logout
          </Button>
        </IconButton>
      </MenuItem>:
      <MenuItem>
      <IconButton size="large" color="inherit">
        <Button a color="inherit"
        onClick={()=>navigate("/user")}>
          Login
        </Button>
      </IconButton>
    </MenuItem>}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{padding:"1rem", backgroundColor:"rgb(148, 143, 143)"}}>
        <Toolbar>
          <LocalHospitalIcon sx={{marginLeft:"2rem"}}/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sm: "block" }, marginLeft:".7rem"}}
          >
            BHM.Online Consultancy
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Button onClick={()=>navigate('/')} color="inherit">Home</Button>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Button onClick={()=>navigate('/doctor_list')} color="inherit">Doctors </Button>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Button onClick={()=>navigate('/consult')} color="inherit">Consult</Button>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Button onClick={()=>navigate('/appointment')} color="inherit">Appointments</Button>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Button onClick={()=>navigate('/hospital')} color="inherit">Hospitals</Button>
            </IconButton>
            {items?  
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Button color="inherit"
              onClick={Logout}
              >Log Out</Button>
            </IconButton>
              : 
              <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Button color="inherit"
              onClick={()=>navigate("/patient_login")}
              >Login</Button>
            </IconButton>}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}

    </Box>
  );
}
