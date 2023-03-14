import React from 'react'
import { Details } from '../../../../Context/DetailedContext/DetailedContext'
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useState, useContext, useEffect } from 'react';

function DetailedView(props) {

    const {detailViewId, setDetailViewId} = useContext(Details)

    const [comp, setComp] = useState([])

    const [comp1, setComp1] = useState([])
    
    const [comp2, setComp2] = useState([])

    const [comp3, setComp3] = useState([])

    // console.log('jithu jacob', comp)

    const[values,setValues] = React.useState({name:'',email:'',phone:'',dept:'',hospital:'', exp:'',address:''})
    console.log('id',props.val)
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/doctor/${props.val}`).then((res) => {
            console.log(res.data)
            // let dict = JSON.parse(res.data)
            setComp(res.data.department);
            setComp1(res.data.doctor_id);
            setComp2(res.data.hospital);
            setComp3(res.data);
            // console.log(comp); 
        });
      }, [])    
 
  return (
    <div> 
        <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={comp && comp1.first_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required 
                  fullWidth
                  id="phone"
                  type="number"
                  name="phone"
                  autoComplete="family-name"
                  value={ comp && comp1.phone}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={comp.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={comp && comp1.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={comp2.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="exp"
                  autoComplete="email"
                  value={comp3.experience}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="note"
                  id="username"
                  autoComplete="username"
                  value={comp3.level}
                />
              </Grid>
            </Grid>

          </Box>
    </div>
  )
}

export default DetailedView