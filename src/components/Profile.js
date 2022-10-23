import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import ReactSquircle from "react-squircle";

async function IsAttend(date) {
  const post = {
    id: window.sessionStorage.getItem("pnum"),
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
  };

  const result = await fetch("https://teammagnus.net/IsAttend", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  }).then((res) => res.json());
  console.log("result:    " + result.ISATTEND);
  return result.ISATTEND;
}

var currentIP;
async function getCurrentIP() {
  const Location = await fetch("https://geolocation-db.com/json/");
  currentIP = await Location.json();
  window.sessionStorage.setItem("currentIP", currentIP.IPv4);
}

function getAttendance(date) {
  const lessonTime = [
    // [시, 분, 지각기준]
    [20, 0, 30],
    [14, 0, 30],
    [16, 0, 30],
  ];

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

  const minutesDiff =
    60 * (date.getHours() - todayLessonTime[0]) +
    date.getMinutes() -
    todayLessonTime[1];

  var attendance;
  if (minutesDiff <= 0) attendance = 0;
  else if (minutesDiff < todayLessonTime[2]) attendance = 1;
  else return (attendance = 2);
  return attendance;

  // if (minutesDiff <= 0) return 0;
  // else if (minutesDiff < todayLessonTime[2]) return 1;
  // else return 2;
}

function isManager() {
  const post = {
    id: window.sessionStorage.getItem("id"),
  };
  fetch("https://teammagnus.net/isManager", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.m == 1) {
        window.sessionStorage.setItem("m", 1);
      } else {
        window.sessionStorage.setItem("m", 0);
      }
    });
}

const getDateAttendanceType = (date) => {
  const post = {
    id: window.sessionStorage.getItem("pnum"),
    name: window.sessionStorage.getItem("name"),
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
  };

  fetch("https://teammagnus.net/getDateAttendanceType", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((json) => {
      switch (json.a) {
        case 0:
          window.sessionStorage.setItem("dateAttendanceType", "출석");
          break;
        case 1:
          window.sessionStorage.setItem("dateAttendanceType", "지각");
          break;
        case 2:
          window.sessionStorage.setItem("dateAttendanceType", "불참");
          break;
        default:
      }
    })
    .catch(() => {
      window.sessionStorage.setItem("dateAttendanceType", 9);
    });
};

function write(date) {
  console.log(`날짜: ${date.getMonth()}월 ${date.getDate()}일`);
  const attendance = getAttendance(date);

  const post = {
    id: window.sessionStorage.getItem("pnum"),
    name: window.sessionStorage.getItem("name"),
    a: attendance,
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    mm: date.getMinutes(),
    s: date.getSeconds(),
  };
  console.log(JSON.stringify(post));

  fetch("https://teammagnus.net/writeDate", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  }).then(() => {
    console.log("success");
    window.sessionStorage.setItem("isAttend", true);
    window.location.reload();
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

  const [ip, setIp] = useState([]);
  const getIP = () => {
    fetch("https://teammagnus.net/getIP", {
      method: "post",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setIp(json);
      });
  };

  console.log(ip);

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
    getIP();
    isManager();
    getMyAbsence();
    getMyWarning();
    getDateAttendanceType(td);
    getCurrentIP();
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
            window.sessionStorage.getItem("dateAttendanceType") == 9 ? (
              <div
                className="div-profile-check-section"
                onClick={async (e) => {
                  const attend = await IsAttend(td);
                  if (attend) {
                    window.sessionStorage.setItem("isAttend", true);
                    alert("이미 출석하셨습니다.");
                    window.location.reload();
                  } else {
                    const Location = await fetch(
                      "https://geolocation-db.com/json/"
                    );
                    const location = await Location.json();
                    var ipCheck = 0;
                    ip.map((i) => {
                      if (location.IPv4 === i.ip) ipCheck = 1;
                    });
                    ipCheck
                      ? write(td)
                      : window.alert("접속 IP를 확인해주세요.");
                  }
                }}
              >
                출석
              </div>
            ) : (
              <div
                className="div-profile-check-section"
                style={{ background: "none", color: "#d2000f" }}
              >
                {window.sessionStorage.getItem("dateAttendanceType")}
              </div>
            )
          ) : (
            <div
              className="div-profile-check-section"
              style={{ background: "none", width: "300px", fontSize: "15px" }}
            >
              <div>훈련일이 아닙니다.</div>
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
