import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import SuperEllipse from "react-superellipse";

async function IsAttend(date) {
  const post = {
    id: window.localStorage.getItem("pnum"),
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

function isManager() {
  const post = {
    id: window.localStorage.getItem("id"),
  };
  fetch("https://teammagnus.net/isManager", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.m == 1) {
        window.localStorage.setItem("m", 1);
      } else {
        window.localStorage.setItem("m", 0);
      }
    });
}

function Profile() {
  const [absence, setAbsence] = useState(null);
  const [attendanceType, setAttendanceType] = useState("");

  const getDateAttendanceType = (date) => {
    const post = {
      id: window.localStorage.getItem("pnum"),
      name: window.localStorage.getItem("name"),
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
            setAttendanceType("출석");
            break;
          case 1:
            setAttendanceType("지각");
            break;
          case 2:
            setAttendanceType("불참");
            break;
          default:
        }
      })
      .catch(() => {
        setAttendanceType(9);
      });
  };

  const getMyAbsence = () => {
    const post = {
      name: window.localStorage.getItem("name"),
      pnum: window.localStorage.getItem("pnum"),
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

  const checkIP = () => {
    const post = {
      id: window.localStorage.getItem("id"),
    };

    fetch("https://teammagnus.net/checkIP", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.success) {
          window.localStorage.setItem("isAttend", true);
          window.alert("출석이 완료되었습니다.");
          window.location.reload();
        } else {
          window.alert("접속 IP를 확인해주세요.");
        }
      });
  };

  const [isWarning, setIsWarning] = useState(false);
  const getMyWarning = () => {
    const post = {
      name: window.localStorage.getItem("name"),
      p: window.localStorage.getItem("pnum"),
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
    isManager();
    getMyAbsence();
    getMyWarning();
    getDateAttendanceType(td);
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
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
        <SuperEllipse className="squircle-profile" r1={0.14} r2={0.5}>
          <img
            className="img-profile-squircle"
            src={window.localStorage.getItem("imageUrl")}
            alt=""
          />
        </SuperEllipse>
        {window.localStorage.getItem("name")}
        <div className="div-profile-date">
          {today.format("YYYY.MM.DD")}
          {td.getDay() === 0 || td.getDay() === 5 || td.getDay() === 6 ? (
            attendanceType == 9 ? (
              <div
                className="div-profile-check-section"
                onClick={async (e) => {
                  const attend = await IsAttend(td);
                  if (attend) {
                    window.localStorage.setItem("isAttend", true);
                    alert("이미 출석하셨습니다.");
                    window.location.reload();
                  } else {
                    checkIP();
                  }
                }}
              >
                출석하기
              </div>
            ) : (
              <div
                className="div-profile-check-section"
                style={{ background: "none", color: "#d2000f" }}
              >
                {attendanceType}
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
