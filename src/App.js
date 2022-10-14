import { Route, Routes, BrowserRouter } from "react-router-dom";
import Attendance from "./components/Attendance";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import KakaoLogin from "./components/KakaoLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Main />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/kakaoLogin" element={<KakaoLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
