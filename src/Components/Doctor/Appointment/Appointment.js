import React from "react";
import { useState, useEffect } from "react";
import "./Appointments.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Modal from "react-modal";


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
  const navigate = useNavigate()
  const [rows, setRows] = useState([]);
  const [doctorId, setDoctorId] = useState();
  const [approveId, setApproveId] = useState();
  const [approveModal, setApproveModal] = useState(false);
  const [boolean, setBoolean] = useState(false);
  const [deleteId, setDeleteId] = useState()
  const [deleteAppointModal, setDeleteAppointModal] = useState(false)




  useEffect(() => {
    axios.get("https://bhmonline.tech/appointments").then((res) => {
      setRows(res.data);
    });
    setDoctorId(localStorage.getItem("user"));
  }, [boolean]);

  // first Modal
  function approveModalShow(id){
    console.log("here")
    setApproveId(id);
    setApproveModal(true);
  }

  function approveRequest() {
    axios
      .put(`https://bhmonline.tech/appointments/${approveId}`, {
        status: true,
      })
      .then((res) => {
        setBoolean(!boolean);
        if (res.status == 202) {
          setApproveModal(false);
          navigate("/appointment_list");
        }
      });
  }

  // second modal

  function SetDeleteAppoint(id) {
    setDeleteId(id);
    setDeleteAppointModal(true);
  }

  function deleteRequest() {
    console.log("reached");
    axios.delete(`https://bhmonline.tech/appointments/${deleteId}`).then((res) => {
      setBoolean(!boolean);
      console.log(res);
      if (res.status == 200) {
        setDeleteAppointModal(false);
        navigate("/appointment_list");
      }
    });
  }

  return (
    <div className="appointmentTable">
     
      {/* Update Modal */}

      <div>
        <Modal
          isOpen={approveModal}
          onRequestClose={() => setApproveModal(false)}
          style={customStyles}
        >
          <div>
            <h3 style={{ marginLeft: "4rem" }}>
              Do you want to Approve this appointment ?
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
              onClick={() => setApproveModal(false)}
            >
              Close
            </Button>
            <Button
              variant="contained"
              component="label"
              onClick={approveRequest}
            >
              Approve
            </Button>
          </div>
        </Modal>
      </div>

      {/* delete modal */}

      <div>
        <Modal
          isOpen={deleteAppointModal}
          onRequestClose={() => setDeleteAppointModal(false)}
          style={customStyles}
        >
          <div>
            <h3 style={{ marginLeft: "4rem" }}>
              Do you want to decline this request ?
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
              onClick={() => setDeleteAppointModal(false)}
            >
              Close
            </Button>
            <Button
              variant="contained"
              component="label"
              onClick={deleteRequest}
            >
              Decline
            </Button>
          </div>
        </Modal>
      </div>

      {/* end  */}
      
      
      <div className="appointsub">
        <div className="upcoming">
          <h1>Upcoming Appointments</h1>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, backgroundColor: "#f0f8ff" }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  console.log(row.patient.id);
                  if (row.doctor.id == doctorId) {
                    if (row.status){
                    return (
                      <TableRow key={row.name} sx={{}}>
                        <TableCell>{row.patient.first_name}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.section}</TableCell>
                        {row.status ? (
                          <TableCell sx={{ color: "green" }}>
                            Accepted
                          </TableCell>
                        ) : (
                          <TableCell>Pending</TableCell>
                        )}
                        <TableCell>
                          <Button
                            component="label"
                            variant="contained"
                            sx={{
                              backgroundColor: "rgb(15, 106, 158)",
                            //   width: "15rem",
                            }}
                            // className="btn1"
                          >
                            Reschedule
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            component="label"
                            variant="contained"
                            sx={{
                              backgroundColor: "#ff4040",
                            }}
                            onClick={()=>SetDeleteAppoint(row.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }}
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="upcoming">
          <h1>Pending Appointments</h1>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, backgroundColor: "#f0f8ff" }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  if (row.doctor.id == doctorId) {
                    if (!row.status){
                    return (
                      <TableRow key={row.name} sx={{}}>
                        <TableCell>{row.patient.first_name}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.section}</TableCell>
                        {row.status ? (
                          <TableCell sx={{ color: "green" }}>
                            Accepted
                          </TableCell>
                        ) : (
                          <TableCell sx={{ color: "red"}}>Pending</TableCell>
                        )}
                        <TableCell>
                          <Button
                            onClick={()=>approveModalShow(row.id)}
                            component="label"
                            variant="contained"
                            sx={{
                              backgroundColor: "rgb(15, 106, 158)",
                            }}
                          >
                            Approve
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            component="label"
                            variant="contained"
                            sx={{
                              backgroundColor: "#ff4040",
                            }}
                            onClick={()=>SetDeleteAppoint(row.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }}
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
