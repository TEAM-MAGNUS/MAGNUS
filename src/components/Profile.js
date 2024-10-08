import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import SuperEllipse from "react-superellipse";
import dongdle from "../asset/profile/dongdle.png";
import Connection from "./Connection";

const IsAttend = async (date) => {
  const result = await Connection("/IsAttend", {
    id: window.localStorage.getItem("pnum"),
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
  });
  return result.ISATTEND;
};

const isManager = () => {
  Connection("/isManager", {
    id: window.localStorage.getItem("id"),
  }).then((res) => {
    if (res.m == 1) {
      window.localStorage.setItem("m", 1);
    } else {
      if (window.localStorage.getItem("m") == 1) {
        window.localStorage.setItem("m", 0);
        window.location.reload();
      }
      window.localStorage.setItem("m", 0);
    }
  });
};

function Profile() {
  const [absence, setAbsence] = useState(null);
  const [attendanceType, setAttendanceType] = useState("");

  const getDateAttendanceType = (date) => {
    Connection("/getDateAttendanceType", {
      id: window.localStorage.getItem("pnum"),
      name: window.localStorage.getItem("name"),
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
    })
      .then((res) => {
        switch (res.a) {
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
    Connection("/getMyAbsence", {
      name: window.localStorage.getItem("name"),
      pnum: window.localStorage.getItem("pnum"),
    }).then((res) => {
      setAbsence(res.date);
    });
  };

  const checkIP = () => {
    Connection("/checkIP", {
      id: window.localStorage.getItem("id"),
    }).then((res) => {
      if (res.success) {
        window.localStorage.setItem("isAttend", true);
        window.alert("출석이 완료되었습니다.");
        window.location.reload();
      } else {
        window.alert(
          "'러쉬클랜_3F' 또는 '러쉬클랜_4F' 와이파이를 이용해주세요."
        );
      }
    });
  };

  const [isWarning, setIsWarning] = useState(false);
  const getMyWarning = () => {
    Connection("/getMyWarning", {
      name: window.localStorage.getItem("name"),
      p: window.localStorage.getItem("pnum"),
    }).then((res) => {
      if (res.c == 6) setIsWarning(true);
    });
  };

  useEffect(() => {
    isManager();
    getMyAbsence();
    getMyWarning();
    getDateAttendanceType(td);

    // let ins = document.createElement("ins");
    // let scr = document.createElement("script");
    // ins.className = "kakao_ad_area";
    // ins.style = "display:none;width:100%;";
    // scr.async = "true";
    // scr.type = "text/javascript";
    // scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    // ins.setAttribute("data-ad-width", "320");
    // ins.setAttribute("data-ad-height", "100");
    // ins.setAttribute("data-ad-unit", "DAN-pXaziggHNW3YPMIT");
    // document.querySelector(".adfit").appendChild(ins);
    // document.querySelector(".adfit").appendChild(scr);
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
        <img
          src={dongdle}
          alt=""
          className="img-profile-dongdle"
          onClick={() => (window.location.href = "https://dongdle.com")}
        />
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
