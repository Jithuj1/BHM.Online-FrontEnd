import "./Doctor.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Doctor() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState([]);
  const [dockSearchName, setDockSearchName] = useState("");

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    axios.get("http://bhmonline.tech/doctor").then((res) => {
      setDoctor(res.data);
      console.log(doctor);
    });
  }, []);

  return (
    <div>
      <div className="top">
        <div className="topContent">
          <div className="best">
            <h1>Best Doctors all over from kerala</h1>
            <h1>Consult 24 * 7 Available</h1>
          </div>
          <div className="searchDock">
            <input
              className="typeDockName"
              type="text"
              placeholder="Search Dock ..!"
              onChange={(e) => setDockSearchName(e.target.value)}
            />
          </div>
        </div>
        {dockSearchName ? (
          <div className="card1">
            <Grid container margin={5}>
              {doctor.map((id) => {
                if (id.doctor_id.status == true) {
                  if (id.doctor_id.first_name
                      .toLocaleLowerCase()
                      .includes(dockSearchName.toLocaleLowerCase())){
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} marginBottom={4}>
                        <Card sx={{ maxWidth: 300 }}>
                          <div className="inside">
                            <div className="img">
                              <CardMedia
                                sx={{ height: 200, width: 190 }}
                                image={id.image}
                                title="green iguana"
                              />
                            </div>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                Dr.{id.doctor_id.first_name}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h6"
                                fontSize={16}
                                component="div"
                              >
                                {id.experience} year experience in{" "}
                                {id.department.name}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h6"
                                fontSize={14}
                                component="div"
                              >
                                {id.level} surgeon in {id.hospital.name}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h6"
                                fontSize={14}
                                component="div"
                              >
                                Email:{id.doctor_id.email}
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginTop: "1rem",
                                }}
                              >
                                <Button
                                  component="label"
                                  variant="contained"
                                  sx={{ backgroundColor: "rgb(15, 106, 158)" }}
                                  className="btn1"
                                  onClick={() => navigate("/appointment")}
                                >
                                  Book An Appointment
                                </Button>
                              </div>
                            </CardContent>
                            <CardActions></CardActions>
                          </div>
                        </Card>
                      </Grid>
                    );
                }}
              })}
            </Grid>
          </div>
        ) : (
          <div className="card1">
            <Grid container margin={5}>
              {doctor.map((id) => {
                if (id.doctor_id.status == true) {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} marginBottom={4}>
                      <Card sx={{ maxWidth: 300 }}>
                        <div className="inside">
                          <div className="img">
                            <CardMedia
                              sx={{ height: 200, width: 190 }}
                              image={id.image}
                              title="green iguana"
                            />
                          </div>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Dr.{id.doctor_id.first_name}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h6"
                              fontSize={16}
                              component="div"
                            >
                              {id.experience} year experience in{" "}
                              {id.department.name}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h6"
                              fontSize={14}
                              component="div"
                            >
                              {id.level} surgeon in {id.hospital.name}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h6"
                              fontSize={14}
                              component="div"
                            >
                              Email:{id.doctor_id.email}
                            </Typography>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "1rem",
                              }}
                            >
                              <Button
                                component="label"
                                variant="contained"
                                sx={{ backgroundColor: "rgb(15, 106, 158)" }}
                                className="btn1"
                                onClick={() => navigate("/appointment")}
                              >
                                Book An Appointment
                              </Button>
                            </div>
                          </CardContent>
                          <CardActions></CardActions>
                        </div>
                      </Card>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}

export default Doctor;
