import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("admin"));
    if (!user) {
      navigate("/patient_login");
    }
  }, []);

  function logout() {
    localStorage.removeItem("admin");
    navigate("/");
  }

  return (
    <div>
      <div className="head">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{ padding: "1rem", backgroundColor: "rgb(148, 143, 143)" }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Welcome Administrator
              </Typography>
              <div className="optn">
                {/* <div className="suboptn">
                  <Button onClick={()=>navigate("/admin_home")} color="inherit">Home</Button>
                </div> */}
                <div className="suboptn">
                  <Button
                    onClick={() => navigate("/admin_home")}
                    color="inherit"
                  >
                    Home
                  </Button>
                </div>
                <div className="suboptn">
                  <Button onClick={() => navigate("/requests")} color="inherit">
                    Requests
                  </Button>
                </div>
                <div className="suboptn">
                  <Button onClick={logout} color="inherit">
                    Logout
                  </Button>
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </div>
  );
}

export default Navbar;
