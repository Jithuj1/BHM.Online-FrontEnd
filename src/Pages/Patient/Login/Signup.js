import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";


const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const navigate= useNavigate()

  const [details, setDetails] = React.useState({firstName:"", lastName:"", email:"", username:"", password:"", age:"", phone:"", address:""})
  const makeChange = (event)=>{
    const {name,value} = event.target;
    setDetails(prevState =>({...prevState,[name]:value})) 
  }

  const submitData =(event) =>{
    event.preventDefault();
    if (details.firstName =="" ||
    details.lastName =="" ||
    details.email =="" ||
    details.username =="" ||
    details.password =="" ||
    details.age =="" ||
    details.phone =="" ||
    details.address ==""){
        alert('Blank Space Not Allowed')
    }
    else{
      axios.post('https://bhmonline.tech/patient',{
        first_name:details.firstName,
        last_name:details.lastName,
        email:details.email ,
        username:details.username,
        password:details.password,
        age:details.age,
        phone:details.phone,
        address:details.address
      }).then((res)=>{
        console.log(res.status)
        console.log(res.data)
        console.log(res)
        if(res.data=="username"){
          alert('Username already taken')
        }else if (res.data == "email"){
          alert("Email already taken")
        }else if (res.status == 202){
          alert("Success")
          navigate('/patient_login')
        }
      })
    }
    
  }

  return (
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs" style={{backgroundColor:''}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={makeChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={makeChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="age"
                  type='number'
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  autoFocus
                  onChange={makeChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  type='number'
                  label="Phone Number"
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
              sx={{ mb: 2, borderColor:"black" }}
              onClick={()=>navigate('/patient_login')}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}