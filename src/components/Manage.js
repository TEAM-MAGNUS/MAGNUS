import { React } from "react";
import { NavLink } from "react-router-dom";

function Manage() {
  return (
    <div className="div-manage-section">
      <div className="div-manage-grid-section">
        <NavLink to="/member" className="link-header div-manage-grid-item">
          <div>회원 관리</div>
        </NavLink>
        <NavLink
          to="/manageAttendance"
          className="link-header div-manage-grid-item"
        >
          <div>출석 관리</div>
        </NavLink>
        <NavLink to="/warning" className="link-header div-manage-grid-item">
          <div>경고자</div>
        </NavLink>
        <NavLink to="/absence" className="link-header div-manage-grid-item">
          <div>미통보 불참</div>
        </NavLink>
        <NavLink to="/injured" className="link-header div-manage-grid-item">
          <div>병결</div>
        </NavLink>
        <NavLink to="/joinDate" className="link-header div-manage-grid-item">
          <div>가입 기수</div>
        </NavLink>
        <NavLink to="/setIP" className="link-header div-manage-grid-item">
          <div>IP 변경</div>
        </NavLink>
        <NavLink to="/average" className="link-header div-manage-grid-item">
          <div>출석 통계</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Manage;
