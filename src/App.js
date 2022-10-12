import { Route, Routes, BrowserRouter } from "react-router-dom";
import Attendance from "./components/Attendance";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import Main from "./components/Main";
import Profile from "./components/Profile";
import Ranking from "./components/Ranking";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
