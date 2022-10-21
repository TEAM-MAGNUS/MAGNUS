import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import ReactSquircle from "react-squircle";
import { HiExternalLink } from "react-icons/hi";

// function isManager() {
//   console.log("mmm");
//   const post = {
//     id: window.sessionStorage.getItem("id"),
//   };
//   fetch("https://teammagnus.net/isManager", {
//     method: "post",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(post),
//   })
//     .then((res) => res.json())
//     .then((json) => {
//       if (json.m == 1) {
//         window.sessionStorage.setItem("m", 1);
//       } else {
//         window.sessionStorage.setItem("m", 0);
//       }
//     });
// }
async function IsAttend(date) {

  const post = {
    query:
      "SELECT EXISTS (SELECT attendance_date FROM magnus_attendance where id = '" +
      window.sessionStorage.getItem("id") +
      "' AND attendance_date = '" +
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      "') AS ISATTEND;"
  }
  console.log(post.query);

  const result = await fetch("https://hansori.net:443/SQL1", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post)
  })
    .then(res => res.json())
  console.log("result:    " + result.ISATTEND);
  return result.ISATTEND;
}

function getAttendance(date) {
  const lessonTime = [
      // [시, 분, 수업 시간]
      [20, 0, 90], 
      [14, 0, 120],
      [16, 0, 120]
  ]

  var todayLessonTime;
  switch (date.getDay()) {
      case 0:
          console.log("sunday");
          todayLessonTime = lessonTime[0];
          break;
      case 5:
          console.log("Friday");
          todayLessonTime = lessonTime[1];
          break;
      case 6:
          console.log("Saturday");
          todayLessonTime = lessonTime[2];
          break;
      default:
          console.log("error: not day");
  }

  const minutesDiff = 60 * (date.getHours() - todayLessonTime[0]) + date.getMinutes() - todayLessonTime[1] ;
  
  var attendance;
  if (minutesDiff <= 0) attendance = 0;
  else if (minutesDiff < todayLessonTime[2]) attendance = 1;
  else return attendance = 2;
  return attendance;

  // if (minutesDiff <= 0) return 0;
  // else if (minutesDiff < todayLessonTime[2]) return 1;
  // else return 2;
};

function write(date) {
  console.log(`날짜: ${date.getMonth()}월 ${date.getDate()}일`);
  const attendance = getAttendance(date);

  const post = {
    query:
      "INSERT INTO magnus_attendance (id, name, attendance, attendance_date, attendance_time) VALUES ('" +
      window.sessionStorage.getItem("id") +
      "', '" +
      window.sessionStorage.getItem("name") +
      "', " +
      attendance +
      ", '" +
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      "', '" +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      "');",
  };
  console.log(JSON.stringify(post));

  // fetch("http://15.165.207.25:80/SQL1", {
 fetch("https://hansori.net:443/SQL1", {
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

  const [isWarning, setIsWarning] = useState(false);
  const getMyWarning = () => {
    const post = {
      name: window.sessionStorage.getItem("name"),
      p: window.sessionStorage.getItem("pnum"),
    };
    fetch("https://teammagnus.net/getMyWarning", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.c == 6) setIsWarning(true);
      });
  };
  useEffect(() => {
    getMyAbsence();
    getMyWarning();
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
        {absence && (
          <div className="div-profile-absence-section">
            <div className="div-profile-absence">미통보불참</div>
            {absence}
          </div>
        )}
        {isWarning && (
          <div className="div-profile-warning ">2주 연속 불참입니다!</div>
        )}
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
                const attend = await IsAttend(td);
                if (attend) {
                  alert("이미 출석하셨습니다.");
                } else {
                  const Location = await fetch(
                    "https://geolocation-db.com/json/"
                  );
                  const location = await Location.json();
                  location.IPv4 === "121.160.20.182"
                    ? write(td)
                    : console.log("ip가 다릅니다.");
                }
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
      </div>
    </>
  );
}

export default Profile;
