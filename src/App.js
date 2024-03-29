import { Route, Routes, BrowserRouter } from "react-router-dom";
import Attendance from "./components/Attendance";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import KakaoLogin from "./components/KakaoLogin";
import Notice from "./components/Notice";
import Profile from "./components/Profile";
import Ranking from "./components/Ranking";
import Manage from "./components/Manage";
import Warning from "./components/Warning";
import Average from "./components/Average";
import Absence from "./components/Absence";
import Member from "./components/Member";
import MemberAttendance from "./components/MemberAttendance";
import ManageAttendance from "./components/ManageAttendance";
import ManageAbsence from "./components/ManageAbsence";
import NotFound from "./components/NotFound";

import Protected from "./components/Protected";
import ProtectedM from "./components/ProtectedM";
import SetIP from "./components/SetIP";
import JoinDate from "./components/JoinDate";
import Injured from "./components/Injured";
import Technique from "./components/Technique";
import ComingSoon from "./components/ComingSoon";
import Regulations from "./components/Regulations";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Protected element={Profile} />} />
          <Route
            path="/attendance"
            element={<Protected element={Attendance} />}
          />
          <Route path="/kakaoLogin" element={<KakaoLogin />} />
          <Route path="/ranking" element={<Protected element={Ranking} />} />
          <Route
            path="/technique"
            element={<Protected element={Technique} />}
          />
          <Route path="/calendar" element={<Protected element={Calendar} />} />
          <Route path="/notice" element={<Protected element={Notice} />} />
          <Route
            path="/regulations"
            element={<Protected element={Regulations} />}
          />
          <Route path="/manage" element={<ProtectedM element={Manage} />} />
          <Route path="/warning" element={<ProtectedM element={Warning} />} />
          <Route path="/average" element={<ProtectedM element={Average} />} />
          <Route path="/absence" element={<ProtectedM element={Absence} />} />
          <Route path="/injured" element={<ProtectedM element={Injured} />} />
          <Route path="/member" element={<ProtectedM element={Member} />} />
          <Route
            path="/memberAttendance"
            element={<ProtectedM element={MemberAttendance} />}
          />
          <Route
            path="/manageAttendance"
            element={<ProtectedM element={ManageAttendance} />}
          />
          <Route
            path="/manageAbsence"
            element={<ProtectedM element={ManageAbsence} />}
          />
          <Route path="/setIP" element={<ProtectedM element={SetIP} />} />
          <Route path="/joinDate" element={<ProtectedM element={JoinDate} />} />
          <Route
            path="/comingsoon"
            element={<ProtectedM element={ComingSoon} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
