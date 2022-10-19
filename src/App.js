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
import All from "./components/All";
import ManageAttendance from "./components/ManageAttendance";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/kakaoLogin" element={<KakaoLogin />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/warning" element={<Warning />} />
          <Route path="/average" element={<Average />} />
          <Route path="/absence" element={<Absence />} />
          <Route path="/member" element={<Member />} />
          <Route path="/memberAttendance" element={<MemberAttendance />} />
          <Route path="/all" element={<All />} />
          <Route path="/manageAttendance" element={<ManageAttendance />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
