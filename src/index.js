import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import DoctorContext from "./Context/DoctorContext/DoctorContext";
import RandomNumber from "./Context/RandomContext/RandomNumber";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DoctorContext>
      <RandomNumber>
        <App />
      </RandomNumber>
    </DoctorContext>
  </React.StrictMode>
);
