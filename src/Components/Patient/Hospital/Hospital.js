import axios from "axios";
import React from "react";
import "./Hospital.css";
import { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Hospital() {
  const navigate = useNavigate()
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios.get("https://bhmonline.tech/hospital").then((res) => {
      setHospitals(res.data);
      console.log(hospitals);
    });
  }, []);

  return (
    <div className="container">
      <div style={{ margin: "3rem", fontSize: "1.2rem", fontWeight: 500 }}>
        People will forget what you said, forget what you did, but people will
        never forget how you made them feel.
      </div>
      {hospitals.map((id) => {
        return (
          <div className="top2">
            <div>
              <div>
                <div className="img">
                  <CardMedia
                    sx={{ height: 200, width: 350, margin: 5 }}
                    image={id.image}
                    title="green iguana"
                  />
                </div>
              </div>
            </div>
            <div>
              <div
                style={{ fontWeight: 500, fontSize: "1.5rem", margin: "1rem" }}
              >
                {id.name}
              </div>
              <div style={{ margin: ".5rem" }}>Email : {id.email}</div>
              <div style={{ margin: ".5rem" }}>Contact Number : {id.phone}</div>
              <div style={{ margin: ".5rem" }}>Address : {id.address}</div>
            </div>
            <div>
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
                <br />
                <Button
                  sx={{
                    backgroundColor: "rgb(15, 106, 158)",
                    marginBottom: "1.5rem",
                  }}
                  variant="contained"
                  onClick={() => navigate("/consult")}
                >
                  Consult
                </Button>
                <Button
                  sx={{ backgroundColor: "rgb(15, 106, 158)" }}
                  variant="contained"
                >
                  Contact Now
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Hospital;
