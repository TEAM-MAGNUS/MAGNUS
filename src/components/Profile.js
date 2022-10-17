import React from "react";
import profile from "../asset/profile/profile.png";
import dayjs from "dayjs";

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
  const today = dayjs(new Date());
  const td = new Date();
  return (
    <>
      <div className="div-profile-profile">
        <img className="img-profile-profile" src={window.sessionStorage.getItem("imageUrl")} alt={profile} />
        {window.sessionStorage.getItem("userName")}
      </div>
      <div className="div-profile-date">{today.format("YYYY.MM.DD")}</div>
      {td.getDay() === 0 || td.getDay() === 5 || td.getDay() === 6 ? (
        <div
          className="div-profile-check"
          onClick={async (e) => {
            const Location = await fetch("https://geolocation-db.com/json/");
            const location = await Location.json();
            location.IPv4 === "210.94.182.243"
              ? write(location.IPv4, td)
              : console.log("ip가 다릅니다.");
          }}
        >
          출석
        </div>
      ) : (
        <div className="div-profile-check">ㅡ</div>
      )}
    </>
  );
}

export default Profile;
