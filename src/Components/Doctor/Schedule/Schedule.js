import "./Schedule.css";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useEffect, useContext } from "react";
import axios from "axios";
import { Doctor } from "../../../Context/DoctorContext/DoctorContext";
import { useNavigate } from "react-router-dom";

function Schedule() {
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [time1, setTime1] = useState();
  const [time2, setTime2] = useState();
  const [u1, setU1] = useState("");
  const [u2, setU2] = useState("");
  let [user, setUser] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [bool, setBool] = useState(false);
  const [profile, setProfile] = useState();

  const { doctorDetails, setDoctorDetails } = useContext(Doctor);

  const now = new Date();

  console.log('today', now)

  user =
    now.getFullYear() +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + now.getDate()).slice(-2);

    console.log(user)

  useEffect(() => {
    setU1(localStorage.getItem("user"));
    setU2(localStorage.getItem("doctor_id"));
    axios.get(`http://bhmonline.tech/doctor/${doctorDetails}`).then((res) => {
      setProfile(res.data);
    });
    axios.get("http://bhmonline.tech/schedule").then((res) => {
      setSchedules(res.data);
    });

    console.log("profile", doctorDetails);
  }, [bool]);

  const birthday = (e) => {
    setDate(e.target.value);
    console.log(date, 'date')
  };

  const starttime = (e) => {
    setTime1(e.target.value);
  };

  const endtime = (e) => {
    setTime2(e.target.value);
  };

  const onHandleSubmit = () => {
    console.log(date, time1, time2);
    axios
      .post("http://bhmonline.tech/schedule", {
        doctor: u1,
        date: date,
        start: time1,
        end: time2,
      })
      .then((res) => {
        console.log(res);
        if ((res.status = 200)) {
          navigate("/schedule");
          setBool(!bool);
        } else {
          alert("failed");
        }
      });
  };

  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
          fontSize: "1.2rem",
          fontWeight: 400,
        }}
      >
        Schedule your valuable time for BHM.consultancy and get paid !
      </h1>
      <div className="scheduleMain">
        <div className="scheduleSub">
            <div className="tablehead">
              <div>Date</div>
              <div>Time</div>
            </div>
            <div className="tableheadsub">
              {schedules.map((id) => {
                if (id.doctor == u1) {
                  return (
                    <div className="tablebody">
                      <div>{id.date}</div>
                      <div>
                        {id.start} to {id.end}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
        </div>
        <div className="scheduleSub">
          <div className="datapic">
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                }}
              >
                <h1>Select Available Date</h1>
              </div>
              <div>
                <TextField
                  id="date"
                  label=""
                  type="date"
                  defaultValue="12-01-2023"
                  sx={{ width: 220 }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: user }}
                  onChange={birthday}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "30rem",
                marginTop: "1.5rem",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  <h1>Start Time</h1>
                </div>
                <div>
                  <TextField
                    id="time"
                    label=""
                    type="time"
                    defaultValue="07:30"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    sx={{ width: 150 }}
                    onChange={starttime}
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  <h1>End Time</h1>
                </div>
                <div>
                  <TextField
                    id="time"
                    label=""
                    type="time"
                    defaultValue="07:30"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    sx={{ width: 150 }}
                    onChange={endtime}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button
                component="label"
                variant="contained"
                sx={{
                  backgroundColor: "rgb(15, 106, 158)",
                  width: "15rem",
                  marginTop: "1.5rem",
                }}
                className="btn1"
                onClick={onHandleSubmit}
              >
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
