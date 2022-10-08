import React from "react";
import profile from "../asset/attendance/profile.png";

function Attendance() {
  var today = new Date();
  return (
    <>
      <div className="div-attendance-profile">
        <img className="img-attendance-profile" src={profile} alt="" />
        name1
      </div>
      <div className="div-attendance-date">{today.toLocaleDateString()}</div>
      {today.getDay() === 0 || today.getDay() === 5 || today.getDay() === 6 ? (
        <div className="div-attendance-check">출석</div>
      ) : (
        <div className="div-attendance-check">ㅡ</div>
      )}
    </>
  );
}

export default Attendance;
