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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


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
  const { detailViewId, setDetailViewId } = useContext(Details);
  const [viewId, setviewId] = useState();
  const [val, setVal] = useState();

  function SetDeleteUserId(id) {
    console.log("here", id)
    setDoctorId(id);
    setDeleteCompanyModal(true);
  }

  function SetDeleteUserId1(id) {
    setApproveId(id);
    setApproveModal(true);
  }

  function SetCompanyId() {
    setDetailView(true);
  }

  function deleteRequest() {
    console.log("reached");
    axios.delete(`https://bhmonline.tech/department/${doctorId}`).then((res) => {
      console.log('here')
      setBoolean(!boolean);
      console.log(res);
      if (res.status == 200) {
        setDeleteCompanyModal(false);
      }
    });
  }


  function deleteHospital() {
    console.log("reached");
    axios.delete(`https://bhmonline.tech/hospital/${approveId}`).then((res) => {
      console.log('here')
      console.log(res)
      setBoolean(!boolean);
      if (res.status == 200) {
        setApproveModal(false);
      }
    });
  }

  

  function approveRequest() {
    console.log("reached");
    axios
      .get(`https://bhmonline.tech/doctor/${approveId}`)
      .then((res) => setVal(res.data.doctor_id.id));
    axios
      .put(`https://bhmonline.tech/patient/${val}`, {
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

  const [dept, setDept] = useState([]);
  const [hospital, setHospital] = useState([]);

  useEffect(() => {
    axios.get("https://bhmonline.tech/doctor").then((res) => {
      setDoctors(res.data);
    });
    axios.get("https://bhmonline.tech/department").then((res) => {
      setDept(res.data);
      console.log(dept);
    });
    axios.get("https://bhmonline.tech/hospital").then((res) => {
      setHospital(res.data);
    });
  }, [boolean]);


  const [first, setFirst] = useState('')

    const saveData =(e)=>{
        setFirst(e.target.value)
    }

    function handleSubmit(){
        console.log(first)
        axios.post("https://bhmonline.tech/department", {name:first}).then((res)=>{
            console.log(res)
            if(res.data.status == "ok"){
                console.log('jithu')
                setDetailView(false)
                setBoolean(!boolean);
            }
            else{
                navigate("/faculties")
            }
        })
    }


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
              Do you want to delete this department ?
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
              Delete
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
              Do you want to delete this hospital ?
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
              onClick={deleteHospital}
            >
              Delete
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
            <button onClick={() => setDetailView(false)}>Close</button>
          </div>
          <div>
            <div style={{ width: "35vw" }}>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                <div
                  style={{
                    marginLeft: "3rem",
                    display: "flex",
                    justifyContent: "space-between",
                    width: 600,
                  }}
                >
                  <TextField
                    onChange={saveData}
                    fullWidth
                    label="Department Name"
                    id="fullWidth"
                  />
                  <Button
                    onClick={handleSubmit}
                    sx={{ width: 300 }}
                    variant="contained"
                  >
                    Add Department
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </Modal>

      {/* end of detailed view */}

      <div style={{ margin: "5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{ fontSize: "2rem", fontWeight: "500", marginBlock: "2rem" }}
          >
            Doctors
          </h1>
        </div>

        <TableContainer
          component={Paper}
          style={{ backgroundColor: "#c0c0c0" }}
        >
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
              {doctor.map((id) => {
                if (id.doctor_id.status == true) {
                  return (
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
                          //   onClick={() => SetDeleteUserId1(id.id)}
                          variant="outlined"
                          sx={{ backgroundColor: "#66cdaa", color: "black " }}
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          //   onClick={() => SetDeleteUserId(id.id)}
                          variant="outlined"
                          sx={{ backgroundColor: "#be1616", color: "black" }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div style={{ margin: "5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <h1
            style={{ fontSize: "2rem", fontWeight: "500", marginBlock: "2rem" }}
          >
            Departments
          </h1>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#6666",
              color: "black",
              marginRight: "5rem",
              paddingLeft: "3rem",
              paddingRight: "3rem",
            }}
            onClick={SetCompanyId}
          >
            Add New Department
          </Button>
        </div>

        <TableContainer
          component={Paper}
          style={{ backgroundColor: "#c0c0c0" }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Department Name</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dept.map((id) => {
                return (
                  <TableRow
                    key={id.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {id.id}
                    </TableCell>
                    <TableCell align="left">{id.name}</TableCell>

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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div style={{ margin: "5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <h1
            style={{ fontSize: "2rem", fontWeight: "500", marginBlock: "2rem" }}
          >
            Hospitals
          </h1>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#6666",
              color: "black",
              marginRight: "5rem",
              paddingLeft: "3rem",
              paddingRight: "3rem",
            }}
            onClick={()=>{navigate("/add_hospital")}}
          >
            Add New Hospital
          </Button>
        </div>

        <TableContainer
          component={Paper}
          style={{ backgroundColor: "#c0c0c0" }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Hospital Name</TableCell>
                <TableCell align="left">Contact Number</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hospital.map((id) => {
                return (
                  <TableRow
                    key={id.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {id.id}
                    </TableCell>
                    <TableCell align="left">{id.name}</TableCell>

                    <TableCell align="left">{id.phone}</TableCell>
                    <TableCell align="left">{id.email}</TableCell>
                    <TableCell align="left">{id.address}</TableCell>
                    <TableCell align="left">
                      <Button
                        //   onClick={() => SetDeleteUserId(id.id)}
                        variant="outlined"
                        sx={{ backgroundColor: "#66cdaa", color: "black" }}
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                          onClick={() => SetDeleteUserId1(id.id)}
                        variant="outlined"
                        sx={{ backgroundColor: "#be1616", color: "black" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Requests;
