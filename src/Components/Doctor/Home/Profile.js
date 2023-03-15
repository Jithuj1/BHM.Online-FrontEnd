import React from "react";
import "./Profile.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import CardMedia from "@mui/material/CardMedia";
import {Doctor} from "../../../Context/DoctorContext/DoctorContext"


function Profile() {
  const [profile, setProfile] = useState([]);
  const [decoded, setDecoded] = useState();
  const {doctorDetails, setDoctorDetails} = useContext(Doctor)  

  useEffect(() => {
    axios.get("https://bhmonline.tech/doctor").then((res) => {
      setProfile(res.data);
    });

    const user = JSON.parse(localStorage.getItem("doctor"));
    console.log(user);
    setDecoded(jwtDecode(user.login));
  }, []);

  return (
    <div className="for1">
      {profile.map((id) => {
        if (decoded.id == id.doctor_id.id) {
          localStorage.setItem("user",id.id);
          localStorage.setItem("doctor_id",id.doctor_id.id);
          setDoctorDetails(id.id);
          return (
            <div className="profile1">
              <div className="card2">
                <div className="element1" style={{ fontWeight: 500 }}>
                  Name : Dr. {id.doctor_id.first_name}
                </div>
                <div className="element1">
                  Experience : {id.experience} year{" "}
                </div>
                <div className="element1">
                  Department : {id.department.name}
                </div>
                <div className="element1">Hospital : {id.hospital.name}</div>
                <div className="element1">Contact : {id.doctor_id.phone}</div>
                <div className="element1">Email : {id.doctor_id.email}</div>
                <div className="element1">Consult : 2345</div>
              </div>
              <div className="card2">
                <div>
                  <div className="">
                    <CardMedia
                      sx={{ height: 275, width: 350 }}
                      image={id.image}
                      title="green iguana"
                    />
                  </div>
                  <div style={{marginLeft:"5rem", marginTop:".8rem", fontWeight:500}}> Dr. {id.doctor_id.first_name}</div>
                  <div style={{marginLeft:"5rem", marginTop:".8rem", fontWeight:500}}> HOD - Senior Consultant </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Profile;
