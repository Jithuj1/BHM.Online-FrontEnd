import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import { useState } from "react";


// select style

// end of select style

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const navigate = useNavigate();

  const [details, setDetails] = React.useState({
    name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    exp: "",
    note: "",
    address:""
  });
  const makeChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitData = (event) => {
    event.preventDefault();
    console.log(details);
    console.log(department_id);
    console.log(hospital_id)
    if (
      details.name == "" ||
      details.exp == "" ||
      details.email == "" ||
      details.username == "" ||
      details.password == "" ||
      details.note == "" ||
      details.phone == "" ||
      details.address == "" ||
      department_id ==""||
      hospital_id ==""
    ) {
      alert("Blank Space Not Allowed");
    }
    else {
      console.log('enter', image);
      var formField = new FormData();
      formField.append('first_name', details.name)
      formField.append('department', department_id)
      formField.append('hospital', hospital_id)
      formField.append('email', details.email)
      formField.append('username', details.username)
      formField.append('password', details.password)
      formField.append('experience', details.exp)
      formField.append('phone', details.phone)
      formField.append('address', details.address)
      formField.append('note', details.note)
      formField.append('is_staff', true)
      formField.append('image', image)
      axios
        .post("http://bhmonline.tech/doctor", formField)
        .then((res) => {
          console.log(res.status);
          console.log(res.data);
          console.log(res);
          if (res.data == "username") {
            alert("Username already taken");
          } else if (res.data == "email") {
            alert("Email already taken");
          } else if (res.status == 202) {
            alert("Request successful submitted");
            navigate("/patient_login");
          }
        });
    }
  };

  // select box one

  useEffect(() => {
    axios.get("http://bhmonline.tech/hospital").then((res) => {
      console.log(res.data);
      setNames(res.data);
    });
    axios.get("http://bhmonline.tech/department").then((res) => {
      console.log(res.data);
      setDept(res.data);
    });
  }, []);

  const [names, setNames] = React.useState([]);
  const [dept, setDept] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [hospital_id, setHospital] = React.useState('');
  const [department_id, setDepartment] = React.useState('');
  
  
  const handleChange = (event) => {
    setHospital(event.target.value);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  // select box end
  
  // second select
  const handleChange1 = (event) => {
    setDepartment(event.target.value);
  };
  
  const handleClose1 = () => {
    setOpen1(false);
  };
  
  const handleOpen1 = () => {
    setOpen1(true);
  };

  
  const [image, setImage] = useState()
  
  // function onImageChange (e){
  //   console.log('jithu', e.target.files);
  //   setImages(e.target.files[0]);
  //   console.log("jith", images);
  // }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ backgroundColor: "" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                  onChange={makeChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  type="number"
                  label="Contact Number"
                  name="phone"
                  autoComplete="family-name"
                  onChange={makeChange}
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
                  onChange={makeChange}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl sx={{ minWidth: 241 }}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open1}
                    onClose={handleClose1}
                    onOpen={handleOpen1}
                    name="dept"
                    Value={department_id}
                    label="dept"
                    onChange={handleChange1}
                  >
                    {dept.map((id)=>{
                      return(
                        <MenuItem value={id.id}>{id.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>


              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="number"
                  label="Experience in Year"
                  name="exp"
                  autoComplete="email"
                  onChange={makeChange}
                />
              </Grid>


              <Grid item xs={6}>
                <FormControl sx={{ minWidth: 500 }}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Hospital
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={hospital_id}
                    label="Age"
                    name="hospital"
                    onChange={handleChange}
                  >
                    {names.map((id)=>{
                      return(
                        <MenuItem value={id.id}>{id.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Contact Address"
                  name="address"
                  autoComplete="address"
                  onChange={makeChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  id="username"
                  autoComplete="username"
                  onChange={makeChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={makeChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="note"
                  label="Carrier Note"
                  id="username"
                  autoComplete="username"
                  onChange={makeChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="file"
                  name="file"
                  onChange={(e)=>setImage(e.target.files[0])}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submitData}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="Success"
              sx={{ mb: 2, borderColor: "black" }}
              onClick={() => navigate("/doctor_login")}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
