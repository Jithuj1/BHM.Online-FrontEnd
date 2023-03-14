import React, { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import "./Consultation.css";
import Button from "@mui/material/Button";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import DuoIcon from "@mui/icons-material/Duo";
import axios from "axios";
import { format, render, cancel, register } from "timeago.js";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import CircleIcon from "@mui/icons-material/Circle";
import CardMedia from "@mui/material/CardMedia";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { Random } from "../../../Context/RandomContext/RandomNumber";



function Consultation() {
  const [notifications, setNotifications] = useState([]);
  const [msg, setMsg] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [viewPatient, setViewPatient] = useState();
  const [room, setRoom] = useState();
  const [uid, setUid] = useState();
  const [dock, setDock] = useState();
  const [bool, setBool] = useState(true);
  const [prescriptionNote, setPrescriptionNote] = useState();
  const navigate = useNavigate()
  const socket = useRef();

  let {randomNUmberRef} = useContext(Random);


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/notification").then((res) => {
      setNotifications(res.data.data);
    });
    setDock(localStorage.getItem("doctor_id"));
  }, [bool]);

  useEffect(() => {
    console.log("websocket is opening");

    if (room) {
      socket.current = new W3CWebSocket(
        "ws://127.0.0.1:8000/ws/chat/" + room.id + "/" + uid + "/"
      );

      console.log(socket.current, "haii");
      socket.current.onopen = () => {
        console.log("WebSocket Client Connected");
      };
      socket.current.onclose = () => {
        console.log("websocket is closed");
      };
      socket.current.onerror = (error) => {
        console.log("websocket error", error);
      };
      socket.current.onmessage = (event) => {
        const value = JSON.parse(event.data);
        console.log("event data", value);
        setChatMessages((chatMessages) => [...chatMessages, value]);
      };
      console.log("dock", dock);
    }
  }, [room]);

  function sendMessage() {
    console.log("sending message");
    console.log(msg);
    socket.current.send(
      JSON.stringify({
        message: msg,
        sender: dock,
        receiver: uid,
      })
    );
    console.log("chat items", chatMessages);
    setMsg("");
  }

  function makeRoom(id, nid) {
    setUid(id);
    axios.put(`http://127.0.0.1:8000/updateNotification/${nid}`, {
      read: true,
    });
    console.log("uid", id, nid);
    axios.get(`http://127.0.0.1:8000/get_room/${id}/${dock}`).then((res) => {
      setRoom(res.data);
      console.log('res', res.data)
      console.log("room", room)
    });
    axios.get(`http://127.0.0.1:8000/patient/${id}`).then((res) => {
      setViewPatient(res.data);
    });
    setBool(!bool);
    
  }

  function pdfGenerate() {
    console.log(prescriptionNote);
    const myFont = prescriptionNote;
    var doc = new jsPDF("landscape", "px", "a4", "false");
    doc.text("           Welcome to BHM Online Consultancy", 10, 30);
    doc.text("Your Prescription Note ", 30, 60);
    doc.text(prescriptionNote, 50, 100);
    setPrescriptionNote('');
    console.log('pi', prescriptionNote)
    doc.save("Prescription.pdf");
  }

  function videoCall (e){
    console.log(randomNUmberRef)
    e.preventDefault()
    navigate(`/room/${room.videoId}`)
  }

  return (
    <div>
      <div className="consult">
        <div className="consultClass">
          <div className="part1">
            <div className="noti1">Notifications</div>
            <div className="noti2">
              {notifications && (
                <div>
                  {notifications.map((i) => {
                    return (
                      <div className="singleNotification">
                        <div className="notificationName">
                          Dr. {i.doctor.first_name}{" "}
                          <div className="notificationTime">
                            {format(i.now, "en_IN")}
                          </div>
                        </div>
                        <div className="notificationParagraph">
                          You have new consult request from{" "}
                          {i.patient.first_name}
                        </div>
                        {!i.read && (
                          <div className="notificationButtons">
                            <Button
                              component="label"
                              variant="contained"
                              sx={{
                                backgroundColor: "#666666",
                                width: "5rem",
                                height: "1.5rem",
                              }}
                              className="btn1"
                              // onClick={sendMessage}
                            >
                              Decline
                            </Button>
                            <Button
                              component="label"
                              variant="contained"
                              sx={{
                                backgroundColor: "#008000",
                                width: "5rem",
                                height: "1.5rem",
                              }}
                              className="btn1"
                              onClick={() => makeRoom(i.patient.id, i.id)}
                            >
                              Accept
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="part2">
            {viewPatient ? (
              <div className="part2a">
                <div className="part2sub1">
                  <div className=" chatboxheader">
                    <div className="onlineDockImage">
                      <CardMedia
                        sx={{
                          height: 50,
                          width: 50,
                          borderRadius: "50%",
                        }}
                        image="https://i.ndtvimg.com/i/2017-03/jon-snow_640x480_71490164613.jpg"
                        title="green iguana"
                      />
                    </div>
                    <div className="namedock">
                      {viewPatient.first_name}
                      <div className="">
                        <CircleIcon
                          sx={{
                            color: "green",
                            width: ".8rem",
                            marginLeft: ".6rem",
                          }}
                        />
                      </div>
                    </div>
                    <div className="chatboxcall">
                      {/* <div className="callIcon">
                        <AddIcCallIcon fontSize={"large"} />
                      </div> */}
                      <div className="videoCallIcon">
                        <DuoIcon onClick={videoCall} fontSize={"large"} />
                      </div>
                    </div>
                  </div>
                  <div className=" chatboxcontent">
                    <div className="chatOuterLine">
                      <ul>
                        {chatMessages ? (
                          chatMessages.map((index) => {
                            if (index.sender == dock) {
                              return (
                                <li className="sender"> {index.message}</li>
                              );
                            } else {
                              return (
                                <li className="receiver"> {index.message}</li>
                              );
                            }
                          })
                        ) : (
                          <li className="receiver"> </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="part2sub2">
                  <div className="chatbox">
                    <input
                      onChange={(e) => setMsg(e.target.value)}
                      className="typeboxdesign"
                      type="text"
                      placeholder="Type something ...?"
                      value={msg}
                    />
                  </div>
                  <div className="submit">
                    <Button
                      component="label"
                      variant="contained"
                      sx={{
                        backgroundColor: "rgb(15, 106, 158)",
                        width: "5rem",
                      }}
                      className="btn1"
                      onClick={sendMessage}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="else">
                Make a good response with patients and get paid
              </div>
            )}
          </div>
          <div className="part3">
            <div className="part3sub1">
              <div className="noti1">Prescription Note</div>
            </div>
            <div className="textarea">
              <textarea
                value={prescriptionNote}
                onChange={(e) => setPrescriptionNote(e.target.value)}
                className="textareacontent"
                name=""
                id=""
                cols="36"
                rows="14"
              ></textarea>
            </div>
            <div>
              <div className="notificationButtons">
                <Button
                  component="label"
                  variant="contained"
                  sx={{
                    backgroundColor: "rgb(74, 127, 112)",
                    width: "7rem",
                    height: "1.5rem",
                  }}
                  onClick={pdfGenerate}
                  className="btn1"
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consultation;
