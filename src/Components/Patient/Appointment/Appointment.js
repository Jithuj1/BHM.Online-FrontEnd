import React from "react";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "react-modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 800,
  },
};

function Appointment() {
  const navigate = useNavigate();
  const [department_id, setDepartment] = React.useState();
  const [doctor, setDoctor] = React.useState();
  const [patientId, setPatientId] = useState();
  const [section, setSection] = React.useState("");
  const [reload, setReload] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [dept, setDept] = React.useState([]);
  const [dock, setDock] = React.useState([]);
  const [names, setNames] = React.useState([]);
  const [rows, setRows] = useState([]);
  let [user, setUser] = useState("");
  const [date, setDate] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState('')

  const now = new Date();
  user =
    now.getFullYear() +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + now.getDate()).slice(-2);

  useEffect(() => {
    const log = JSON.parse(localStorage.getItem("login"));
    if (!log) {
      navigate("/patient_login");
    } else {
    }
    axios.get("http://bhmonline.tech/doctor").then((res) => {
      console.log(res.data);
      setDock(res.data);
    });
    axios.get("http://bhmonline.tech/department").then((res) => {
      console.log(res.data);
      setDept(res.data);
    });
    setPatientId(localStorage.getItem("patient"));
    axios.get("http://bhmonline.tech/appointments").then((res) => {
      setRows(res.data);
    });
  }, [reload]);

  const handleChange1 = (event) => {
    setDepartment(event.target.value);
    console.log(department_id);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleChange2 = (event) => {
    setDoctor(event.target.value);
    console.log(doctor);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleChange3 = (event) => {
    setSection(event.target.value);
    console.log(section);
  };

  const birthday = (e) => {
    setDate(e.target.value);
    console.log(date);
  };

  function BookAppointment() {
    axios
      .post("http://bhmonline.tech/appointments", {
        doctor: doctor,
        department: department_id,
        date: date,
        section: section,
        patient: patientId,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          alert("success");
          setReload(!reload);
        }
      });
  }

  const deleteDock=(id)=>{
    setDeleteAppointmentId(id)
    setDeleteModal(true);
  }

  function DeleteAppointment (){
    axios.delete(`http://bhmonline.tech/appointments/${deleteAppointmentId}`).then((res)=>{
      setReload(!reload);
      setDeleteModal(!deleteModal)
    })
  }



  return (
    <div className="topapp">
      <div className="appoint">
        <div>
          <Modal
            isOpen={deleteModal}
            onRequestClose={() => setDeleteModal(false)}
            style={customStyles}
          >
            <div>
                <h3 style={{ marginLeft: "4rem" }}>
                  Are you sure to do you want to delete this appointment
                </h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "2rem",
                marginLeft: "15rem",
                marginRight: "15rem",
              }}
            >
              <Button
                variant="contained"
                component="label"
                onClick={() => setDeleteModal(false)}
              >
                Close
              </Button>
              <Button variant="contained" component="label" onClick={DeleteAppointment}>
                Delete
              </Button>
            </div>
          </Modal>
        </div>
        <div className="appoints1">
          <h1 className="your">Your Appointments </h1>
          <div className="tbhead">
            <div className="appointTable">
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650, backgroundColor: "rgb(206, 198, 198)" }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Doctor Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => {
                      console.log(row.patient.id);
                      console.log(patientId);
                      if (row.patient.id == patientId) {
                        return (
                          <TableRow key={row.name} sx={{}}>
                            <TableCell>
                              {row.doctor.doctor_id.first_name}
                            </TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.section}</TableCell>
                            <TableCell>{row.department.name}</TableCell>
                            {row.status ? (
                              <TableCell sx={{ color: "green" }}>
                                Accepted
                              </TableCell>
                            ) : (
                              <TableCell sx={{ color: "red" }}>
                                Pending
                              </TableCell>
                            )}
                            <TableCell>
                              <Button onClick={()=>deleteDock(row.id)}>Delete</Button>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
        <div className="appoints2">
          <h1 className="your">Take New Appointment </h1>
          <div className="app_form">
            <div className="selectbox">
              <Grid item xs={6}>
                <FormControl sx={{ minWidth: 300 }}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Select Department
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
                    {dept.map((id) => {
                      return <MenuItem value={id.id}>{id.name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </div>
            <div className="selectbox">
              <Grid item xs={6}>
                <FormControl sx={{ minWidth: 300 }}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Select Doctor
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open2}
                    onClose={handleClose2}
                    onOpen={handleOpen2}
                    name="dept"
                    Value={department_id}
                    label="dept"
                    onChange={handleChange2}
                  >
                    {dock.map((id) => {
                      if (id.department.id == department_id) {
                        return (
                          <MenuItem value={id.id}>
                            {id.doctor_id.first_name}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </div>
            <div className="selectbox">
              <div>
                <TextField
                  id="date"
                  label=""
                  type="date"
                  defaultValue="Select Date"
                  sx={{ width: 300 }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: user }}
                  onChange={birthday}
                />
              </div>
            </div>
            <div className="selectbox">
              <FormControl sx={{ minWidth: 300 }}>
                <InputLabel id="demo-controlled-open-select-label">
                  Select Section
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  name="dept"
                  Value={department_id}
                  label="dept"
                  onChange={handleChange3}
                >
                  <MenuItem value="Morning">Morning</MenuItem>
                  <MenuItem value="Afternoon">Afternoon</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="selectbox">
              <Button
                component="label"
                variant="contained"
                sx={{
                  backgroundColor: "rgb(15, 106, 158)",
                  width: "18.7rem",
                }}
                className="btn1"
                onClick={BookAppointment}
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
