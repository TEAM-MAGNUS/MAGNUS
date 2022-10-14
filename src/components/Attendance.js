import React from "react";
import profile from "../asset/attendance/profile.png";

function write(ip, date) {
  console.log(`ip: ${ip === "210.94.182.243" ? "true" : "false"}`);
  console.log(`날짜: ${date.getMonth()}월 ${date.getDate()}일`);
  const post = {
    query:
      "INSERT INTO magnus_attendance (ip, date) VALUES ('" +
      ip + "', '" +

      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() +
      "');"
  };

  console.log(post);
  fetch("https://hansori.net:443/SQL1", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  }).then(() => {
    console.log("success");
  });
}

function Attendance() {
  var today = new Date();
  return (
    <>
      <div className="div-attendance-profile">
        <img className="img-attendance-profile" src={profile} alt="" />
        name1
      </div>
      <div className="div-attendance-date">{today.toLocaleDateString()}</div>
      {/* {today.getDay() === 0 || today.getDay() === 5 || today.getDay() === 6 ? ( */}
        <div 
          className="div-attendance-check"
          onClick={async (e) => {
            const Location = await fetch("https://geolocation-db.com/json/")
            const location = await Location.json();
            today = new Date();
            location.IPv4 === "121.160.20.182" ? write(location.IPv4, today) : console.log("ip가 다릅니다.");
          }}
        >
          출석
        </div>
      {/* ) : (
        <div className="div-attendance-check">ㅡ</div>
      )} */}
    </>
  );
}

export default Attendance;
