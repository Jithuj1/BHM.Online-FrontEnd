import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./fa.css"

const theme = createTheme();

function AddDept() {
  const [first, setFirst] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log('hereis')
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      name: data.get("name"),
      phone: data.get("phone"),
      password: data.get("address"),
    });
    console.log(selectedFile)
    let formField = new FormData()
    formField.append('image',selectedFile)
    formField.append('name',data.get("name"))
    formField.append('phone',data.get("phone"))
    formField.append('address',data.get("address"))
    formField.append('email',data.get("email"))
    formField.append('blood',false)
    formField.append('category', "Private Hospital")

    
    axios.post("https://bhmonline.tech/hospital", formField).then((res)=>{
      console.log(res)
      if (res.status == 200){
        alert("Registered Successfully")
        navigate("/admin_home")
      }
      if (res.data == "already"){
        alert("Hospital Already Registered")
      }
    })
  };

  return (
    <div className="top1">
      <div className="pink">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Register New Hospital
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="firstName"
                      label="Hospital Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Contact Number"
                      name="phone"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="address"
                      label="Address"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="file"
                      type="file"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default AddDept;
