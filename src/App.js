import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Patient/Landing/LandingPage";
import User from "./Pages/User/User"
import PatientLogin from "./Pages/Patient/Login/Login"
import PatientRegister from "./Pages/Patient/Login/Signup"
import DoctorLogin from "./Pages/Doctor/Login/Login"
import DoctorRegister from "./Pages/Doctor/Login/Signup"
import AdminLogin from "./Pages/Admin/Home/Login"
import Requests from "./Pages/Admin/Requsets/Requests"
import DoctorList from "./Pages/Patient/Doctor/Doctor"
import Faculties from "./Pages/Admin/Faculties/Faculties"
import AddHospital from "./Components/Admin/Home/Faculties/AddDept"
import Hospital from "./Pages/Patient/Hospital/Hospital";
import DoctorHome from "./Pages/Doctor/Landing/LandingPage"
import Schedule from "./Pages/Doctor/Schedule/Schedule"
import Consult from "./Pages/Patient/Consult/Consult"
import Appointment from "./Pages/Patient/Appointment/Appointment"
import Appointments from "./Pages/Doctor/Appointments/Appointment"
import Notification from "./Pages/Doctor/Notification/Notification"
import Consultation from "./Pages/Doctor/Consultation/Consultation"
import Video from "./Components/Patient/Video/Video";



function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="user" element={<User />}></Route>
          <Route path="patient_login" element={<PatientLogin />}></Route>
          <Route path="patient_register" element={<PatientRegister />}></Route>
          <Route path="doctor_list" element={<DoctorList />}></Route>
          <Route path="doctor_login" element={<DoctorLogin />}></Route>
          <Route path="doctor_register" element={<DoctorRegister />}></Route>
          <Route path="admin" element={<AdminLogin />}></Route>
          <Route path="requests" element={<Requests />}></Route>
          <Route path="admin_home" element={<Faculties />}></Route>
          <Route path="add_hospital" element={<AddHospital />}></Route>
          <Route path="hospital" element={<Hospital />}></Route>
          <Route path="doctor_home" element={<DoctorHome />}></Route>
          <Route path="schedule" element={<Schedule />}></Route>
          <Route path="consult" element={<Consult />}></Route>
          <Route path="appointment" element={<Appointment />}></Route>
          <Route path="appointment_list" element={<Appointments />}></Route>
          <Route path="notification" element={<Notification />}></Route>
          <Route path="consultation" element={<Consultation />}></Route>
          <Route path="/room/:roomId" element={<Video />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
