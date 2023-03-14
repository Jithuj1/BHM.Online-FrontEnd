import React, { useRef } from "react";
import "./Consult.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircleIcon from "@mui/icons-material/Circle";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import DuoIcon from "@mui/icons-material/Duo";
import Modal from "react-modal";
import { Container, Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Random } from "../../../Context/RandomContext/RandomNumber";

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

function ConsultPage() {

  const navigate = useNavigate();
  const [dock, setDock] = useState([]);
  const [viewDock, setViewDock] = useState();
  const [uid, setUid] = useState();
  const [schedule, setSchedule] = useState([]);
  const [onlineId, setOnlineId] = useState([]);
  const [search, setSearch] = useState("");
  const [approveModal, setApproveModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [room, setRoom] = useState();
  const [msg, setMsg] = useState("");
  const [onlineDock, setOnlineDock] = useState();
  const socket = useRef();
  const [videoCallRoomId, setVideoCallRoomId] = useState('')

  let {randomNUmberRef} = useContext(Random);


  const today = new Date();
  let dockList = [];
  const now = moment(new Date()).format("YYYY-MM-DD");
  const showTime =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("login"));
    if (!user) {
      navigate("/patient_login");
    } else {
      setUid(parseInt(localStorage.getItem("patient")));
    }

    axios.get("http://127.0.0.1:8000/doctor").then((res) => {
      setDock(res.data);
    });

    axios.get("http://127.0.0.1:8000/schedule").then((res) => {
      setSchedule(res.data);
    });
  }, []);

  useEffect(() => {
    console.log("schedule", schedule);
    console.log("websocket is opening");
    if (room) {
      socket.current = new W3CWebSocket(
        "ws://127.0.0.1:8000/ws/chat/" + room + "/" + uid + "/"
      );
      console.log(socket, "hey");
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
        console.log(chatMessages);
      };
    }
  }, [room]);

  function sendMessage() {
    console.log("sending message");
    socket.current.send(
      JSON.stringify({
        message: msg,
        sender: uid,
        receiver: viewDock.doctor_id.id,
      })
    );
    console.log("chat items", chatMessages);
    setMsg("");
  }

  function DetailedView(id) {
    setOnlineId(dockList);
    console.log(onlineId, "hello");
    console.log(id);
    axios.get(`http://127.0.0.1:8000/doctor/${id}`).then((res) => {
      setViewDock(res.data);
    });
  }

  const onHandleChange = (e) => {
    setSearch(e.target.value);
  };

  const takeMessage = (e) => {
    setMsg(e.target.value);
  };

  function makeRoom() {
    console.log("dcok", viewDock.doctor_id.id);
    console.log("patient", uid);
    console.log(videoCallRoomId)
    axios
      .post("http://127.0.0.1:8000/rooms", {
        room_name: viewDock.doctor_id.first_name,
        sender: uid,
        receiver: viewDock.doctor_id.id,
      })
      .then((res) => {
        console.log(res.data);
        setRoom(res.data);
        setApproveModal(false);
      });
    axios.post("http://127.0.0.1:8000/notification", {
      patient: uid,
      doctor: viewDock.doctor_id.id,
    });
    axios.get(`http://127.0.0.1:8000/doctor/${viewDock.id}`).then((res) => {
      setOnlineDock(res.data);
    });
  }

  function videoCall (e){
    var maxNumber = 9999;
    const num = Math.floor((Math.random() * maxNumber) + 1);
    e.preventDefault()
    axios.put(`http://127.0.0.1:8000/update_room/${room}`, {
      videoId: num
    }).then((res)=>{
      navigate(`/room/${num}`)
    })
  }


  return (
    <div>
      {/* CONSULT MODAL */}

      <div>
        <Modal
          isOpen={approveModal}
          onRequestClose={() => setApproveModal(false)}
          style={customStyles}
        >
          <div>
            {viewDock && (
              <h3 style={{ marginLeft: "4rem" }}>
                Are you sure to make a consult request to Dr{" "}
                {viewDock.doctor_id.first_name} ?
              </h3>
            )}
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
            <Button variant="contained" component="label" onClick={makeRoom}>
              Request
            </Button>
          </div>
        </Modal>
      </div>
      {/* END OF CONSULT MODAL */}

      <div className="consult">
        <div className="consultClass">
          <div className="part1">
            {viewDock ? (
              <div>
                <div className="pic">
                  <CardMedia
                    sx={{
                      height: 150,
                      width: 150,
                      borderRadius: "50%",
                      marginTop: "1rem",
                    }}
                    image={viewDock.image}
                    title="green iguana"
                  />
                </div>
                <div className="dockdetail">
                  <div style={{ fontSize: "1.5rem", display:"flex" }}>
                    Dr.{viewDock.doctor_id.first_name}
                    {onlineId.includes(viewDock.id) && (
                      <div className="">
                      <CircleIcon
                        sx={{
                          color: "green",
                          width: ".8rem",
                          marginLeft: ".6rem",
                        }}
                      />
                    </div>
                    )}
                  </div>
                  <div style={{ textTransform: "capitalize" }}>
                    Department :{viewDock.department.name}
                  </div>
                  <div>{viewDock.experience} Year Experience</div>
                  <div>Hospital :{viewDock.hospital.name} </div>
                </div>
                <div>
                  {onlineId.includes(viewDock.id) ? (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: ".6rem",
                        }}
                      >
                        <Button
                          component="label"
                          variant="contained"
                          sx={{
                            backgroundColor: "rgb(15, 106, 158)",
                            width: "15rem",
                            marginTop: "1.5rem",
                          }}
                          className="btn1"
                          onClick={() => setApproveModal(true)}
                        >
                          Make a request
                        </Button>
                        <Button
                          component="label"
                          variant="contained"
                          sx={{
                            backgroundColor: "rgb(15, 106, 158)",
                            width: "15rem",
                            marginTop: "1.5rem",
                          }}
                          className="btn1"
                          onClick={() => navigate("/appointment")}
                        >
                          Book An Appointment
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: ".6rem",
                        }}
                      >
                        <Button
                          component="label"
                          variant="contained"
                          sx={{
                            backgroundColor: "rgb(15, 106, 158)",
                            width: "15rem",
                            marginTop: "1.5rem",
                          }}
                          className="btn1"
                          onClick={() => navigate("/appointment")}
                        >
                          Book An Appointment
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="else"></div>
            )}
          </div>
          <div className="part2">
            {onlineDock ? (
              <div className="part2a">
                <div className="part2sub1">
                  <div className=" chatboxheader">
                    <div className="onlineDockImage">
                      <CardMedia
                        sx={{
                          height: 50,
                          width: 50,
                          borderRadius: "50%"
                        }}
                        image={onlineDock.image}
                        title="green iguana"
                      />
                    </div>
                    <div className="namedock">
                      Dr. {onlineDock.doctor_id.first_name}
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
                        {console.log(chatMessages)}
                        {chatMessages ? (
                          chatMessages.map((index) => {
                            if (index.sender == uid) {
                              return (
                                <li className="sender"> {index.message}</li>
                              );
                            } else {
                              return (
                                <li className="receiver">{index.message}</li>
                              );
                            }
                          })
                        ) : (
                          <li className="receiver"></li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="part2sub2">
                  <div className="chatbox">
                    <input
                      value={msg}
                      onChange={takeMessage}
                      className="typeboxdesign"
                      type="text"
                      placeholder="Type something ...?"
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
                Choose a available doctor for immediate consult or choose an
                experienced doctor for booking appointment
              </div>
            )}
          </div>
          <div className="part3">
            <div className="part3sub1">
              <input
                className="search"
                type="text"
                placeholder="   Search ..."
                onChange={onHandleChange}
              />
            </div>
            {search ? (
              <div className="part3sub2">
                {dock.map((i) => {
                  return (
                    <div>
                      {schedule.map((k) => {
                        if (i.id == k.doctor) {
                          if (now == k.date) {
                            if (k.start < showTime && showTime < k.end) {
                              if (
                                i.doctor_id.first_name
                                  .toLocaleLowerCase()
                                  .includes(search.toLocaleLowerCase())
                              ) {
                                return (
                                  <div>
                                    <div className="docklist">
                                      <div className="shortimage">
                                        <CardMedia
                                          sx={{
                                            height: 40,
                                            width: 40,
                                            borderRadius: "50%",
                                          }}
                                          image={i.image}
                                          title="green iguana"
                                        />
                                      </div>
                                      <div
                                        className="dockname"
                                        onClick={() => DetailedView(i.id)}
                                      >
                                        Dr. {i.doctor_id.first_name}
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
                                      <div className="dockonline"></div>
                                    </div>
                                  </div>
                                );
                              }
                            }
                          }
                        }
                      })}
                    </div>
                  );
                })}
                <div className="all">All Doctors</div>
                <div>
                  {dock.map((i) => {
                    if (
                      i.doctor_id.first_name
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    ) {
                      return (
                        <div>
                          <div className="docklist">
                            <div className="shortimage">
                              <CardMedia
                                sx={{
                                  height: 45,
                                  width: 45,
                                  borderRadius: "50%",
                                }}
                                image={i.image}
                                title="green iguana"
                              />
                            </div>
                            <div
                              className="dockname"
                              onClick={() => DetailedView(i.id)}
                            >
                              Dr. {i.doctor_id.first_name}
                            </div>
                            <div className="dockonline"></div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ) : (
              <div className="part3sub2">
                {dock.map((i) => {
                  return (
                    <div>
                      {schedule.map((k) => {
                        if (i.id == k.doctor) {
                          if (now == k.date) {
                            {console.log(k.start, k.end, showTime)}
                            if (k.start< showTime && showTime < k.end) {
                              dockList.push(i.id);
                              !onlineId && setOnlineId(dockList);
                              return (
                                <div>
                                  <div className="docklist">
                                    <div className="shortimage">
                                      <CardMedia
                                        sx={{
                                          height: 40,
                                          width: 40,
                                          borderRadius: "50%",
                                        }}
                                        image={i.image}
                                        title="green iguana"
                                      />
                                    </div>
                                    <div
                                      className="dockname"
                                      onClick={() => DetailedView(i.id)}
                                    >
                                      Dr. {i.doctor_id.first_name}
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
                                    <div className="dockonline"></div>
                                  </div>
                                </div>
                              );
                            }
                          }
                        }
                      })}
                    </div>
                  );
                })}
                <div className="all">All Doctors</div>
                <div>
                  {dock.map((i) => {
                    return (
                      <div>
                        <div className="docklist">
                          <div className="shortimage">
                            <CardMedia
                              sx={{
                                height: 45,
                                width: 45,
                                borderRadius: "50%",
                              }}
                              image={i.image}
                              title="green iguana"
                            />
                          </div>
                          <div
                            className="dockname"
                            onClick={() => DetailedView(i.id)}
                          >
                            Dr. {i.doctor_id.first_name}
                          </div>
                          <div className="dockonline"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultPage;
