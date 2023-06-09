import { fontWeight, padding } from "@mui/system";
import "./Home.css";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Home() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const navigate = useNavigate()

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <div className="main1">
        <div className="sub1">
          <h1 style={{ fontSize: "3rem", fontWeight: "600" }}>
            A heritage in care.
          </h1>
          <h1
            style={{ fontSize: "3rem", marginLeft: "5rem", fontWeight: "600" }}
          >
            A reputation in{" "}
          </h1>
          <h1
            style={{ fontSize: "3rem", marginLeft: "5rem", fontWeight: "600" }}
          >
            {" "}
            excellence.
          </h1>
          <p style={{ marginLeft: "2rem", marginTop: "1rem" }}>
            BHM.Online Consultancy provides excellent service by prioritizing{" "}
            <br></br>
            the safety and security of patient
          </p>
          <h2
            style={{ fontSize: "1.6rem", marginTop: "2rem", fontWeight: "400" }}
          >
            {" "}
            Book An Appointment Now
          </h2>
          <div className="select">
            <span>Are you a doctor ... ?</span>{" "}
            <span>
              <Button
                sx={{
                  ":hover": {
                    bgcolor: "#488A99",
                    color: "white",
                  },
                  backgroundColor: "#488A99",
                  marginLeft: "5rem",
                  width: "15rem",
                  border: "none",
                  color: "white",
                }}
                variant="contained"
                size="large"
                onClick={()=>navigate('/doctor_home')}
              >
                For doctors only
              </Button>
            </span>
          </div>
        </div>
        <div className="sub2"></div>
      </div>
    </div>
  );
}

export default Home;
