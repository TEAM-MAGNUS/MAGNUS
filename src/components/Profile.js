import React, { useState, useEffect } from "react";
import profile from "../asset/profile/profile.png";
import dayjs from "dayjs";
import ReactSquircle from "react-squircle";
import IsMe from "./IsMe";

function write(ip, date) {
  console.log(`ip: ${ip === "210.94.182.243" ? "true" : "false"}`);
  console.log(`날짜: ${date.getMonth()}월 ${date.getDate()}일`);
  const post = {
    query:
      "INSERT INTO magnus_attendance (ip, date) VALUES ('" +
      ip +
      "', '" +
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      "');",
  };

  fetch("http://15.165.207.25:80/SQL1", {
    // fetch("https://hansori.net:443/SQL1", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  }).then(() => {
    console.log("success");
  });
}

function Profile() {
  const [absence, setAbsence] = useState(null);

  const getMyAbsence = () => {
    const post = {
      name: window.sessionStorage.getItem("name"),
      pnum: window.sessionStorage.getItem("pnum"),
    };
    fetch("https://teammagnus.net/getMyAbsence", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setAbsence(json.date);
      });
  };

  useEffect(() => {
    IsMe();
    getMyAbsence();
  }, []);

  const handleLogout = () => {
    window.sessionStorage.clear();
    window.location.reload();
  };
  const today = dayjs(new Date());
  const td = new Date();
  return (
    <>
      <div className="div-profile-profile">
        <ReactSquircle
          width="80px"
          height="80px"
          fit=""
          className="squircle"
          imageUrl={window.sessionStorage.getItem("imageUrl")}
        />
        {window.sessionStorage.getItem("name")}
        <div className="div-profile-date">
          {today.format("YYYY.MM.DD")}
          {td.getDay() === 0 || td.getDay() === 5 || td.getDay() === 6 ? (
            <div
              className="div-profile-check-section"
              onClick={async (e) => {
                const Location = await fetch(
                  "https://geolocation-db.com/json/"
                );
                const location = await Location.json();
                location.IPv4 === "210.94.182.243"
                  ? write(location.IPv4, td)
                  : console.log("ip가 다릅니다.");
              }}
            >
              출석
            </div>
          ) : (
            <div className="div-profile-check-section">
              <div style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>출석</div>
            </div>
          )}
        </div>
        {absence && (
          <div className="div-profile-absence-section">
            <div className="div-profile-absence">미통보불참</div>
            {absence}
          </div>
        )}
      </div>

      <div
        className="button-profile-logout"
        onClick={() => {
          if (window.confirm("정말 로그아웃 하시겠습니까?")) {
            handleLogout();
          }
        }}
      >
        로그아웃
      </div>
    </>
  );
}

export default Profile;
