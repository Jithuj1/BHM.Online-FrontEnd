import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "react-modal";
import { Details } from "../../../../Context/DetailedContext/DetailedContext";
import DetailView from "../DetailedView/DetailedView"


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

function Requests() {
  const [doctor, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [approveId, setApproveId] = useState("");
  const [deleteCompanyModal, setDeleteCompanyModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [boolean, setBoolean] = useState(false);
  const navigate = useNavigate();
  const [detailView, setDetailView] = useState(false);
  const {detailViewId, setDetailViewId} = useContext(Details)
  const [viewId, setviewId] = useState()
  const [val, setVal] = useState()




  function SetDeleteUserId(id) {
    setDoctorId(id);
    setDeleteCompanyModal(true);
  }

  function SetDeleteUserId1(id) {
    setApproveId(id);
    setApproveModal(true);
  }

  function SetCompanyId(id) {
    console.log('jithu', id)
    setviewId(id);
    setDetailView(true);
  }

  function deleteRequest() {
    console.log("reached");
    axios.delete(`//127.0.0.1:8000/doctor/${doctorId}`).then((res) => {
      setBoolean(!boolean);
      console.log(res);
      if (res.status == 200) {
        setDeleteCompanyModal(false);
        navigate("/requests");
      }
    });
  }

  function approveRequest() {
    console.log("reached");
    axios.get(`//127.0.0.1:8000/doctor/${approveId}`).then((res)=>  setVal(res.data.doctor_id.id)) 
    axios
      .put(`//127.0.0.1:8000/patient/${val}`, {
        status: true,
      })
      .then((res) => {
        setBoolean(!boolean);
        console.log(res);
        if (res.status == 200) {
          setApproveModal(false);
          navigate("/requests");
        }
      });
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/doctor").then((res) => {
      setDoctors(res.data);
    });
  }, [boolean]);

  return (
    <div>
      {/* first modal */}
      <div>
        <Modal
          isOpen={deleteCompanyModal}
          onRequestClose={() => setDeleteCompanyModal(false)}
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
              onClick={() => setDeleteCompanyModal(false)}
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

      {/* end of first modal */}

      {/* second modal */}

      <div>
        <Modal
          isOpen={approveModal}
          onRequestClose={() => setApproveModal(false)}
          style={customStyles}
        >
          <div>
            <h3 style={{ marginLeft: "4rem" }}>
              Do you want to Approve this request ?
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

      {/* end second */}

      {/* detailed view modal */}

      <Modal
        isOpen={detailView}
        onRequestClose={() => setDetailView(false)}
        style={customStyles}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={()=>setDetailView(false)}>Close</button>
          </div>
          <div>
            <DetailView val={viewId}/>
          </div>
        </div>
      </Modal>

      {/* end of detailed view */}

      <div style={{ margin: "5rem" }}>
        <h1
          style={{ fontSize: "2rem", fontWeight: "500", marginBlock: "2rem" }}
        >
          New Requests for faculties
        </h1>

        <TableContainer component={Paper} style={{backgroundColor:"#c0c0c0"}}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Department</TableCell>
                <TableCell align="left">Hospital</TableCell>
                <TableCell align="left">Experience</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctor.map((id) =>{if (id.doctor_id.status == false){
                return(
                  <TableRow
                  key={id.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {id.doctor_id.first_name}
                  </TableCell>
                  <TableCell align="left">{id.doctor_id.email}</TableCell>
                  <TableCell align="left">{id.department.name}</TableCell>
                  <TableCell align="left">{id.hospital.name}</TableCell>
                  <TableCell align="left">{id.experience} year</TableCell>
                  <TableCell align="left">New</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => SetDeleteUserId(id.id)}
                      variant="outlined"
                      sx={{ backgroundColor: "#be1616", color: "black" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => SetDeleteUserId1(id.id)}
                      variant="outlined"
                      sx={{ backgroundColor: "#66cdaa", color: "black " }}
                    >
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
                )
              }}           
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ margin: "5rem" }}>
        <h1
          style={{ fontSize: "2rem", fontWeight: "500", marginBlock: "2rem" }}
        >
          Approved Requests
        </h1>

        <TableContainer component={Paper} style={{backgroundColor:"#c0c0c0"}}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Department</TableCell>
                <TableCell align="left">Hospital</TableCell>
                <TableCell align="left">Experience</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {doctor.map((id) =>{if (id.doctor_id.status == true){
                return(
                  <TableRow
                  key={id.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {id.doctor_id.first_name}
                  </TableCell>
                  <TableCell align="left">{id.doctor_id.email}</TableCell>
                  <TableCell align="left">{id.department.name}</TableCell>
                  <TableCell align="left">{id.hospital.name}</TableCell>
                  <TableCell align="left">{id.experience} year</TableCell>
                  <TableCell align="left">New</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => SetCompanyId(id.id)}
                      variant="outlined"
                      sx={{ backgroundColor: "#b0e0e6", color: "black" }}
                    >
                      Detailed View
                    </Button>
                  </TableCell>

                </TableRow>
                )
              }}           
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Requests;
