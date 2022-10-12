import React, { useState } from "react";
import dayjs from "dayjs";

const today = dayjs(new Date());
const td = new Date();

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

  console.log(post.query);
  fetch("https://hansori.net:443/SQL1", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  }).then(() => {
    console.log("success");
  });
}

function Attendance() {
  const year = td.getFullYear();
  const month = td.getMonth();
  const date = td.getDate();

  var calendar = [
    {
      fri: null,
      sat: null,
      sun: null,
    },
    {
      fri: null,
      sat: null,
      sun: null,
    },
    {
      fri: null,
      sat: null,
      sun: null,
    },
    {
      fri: null,
      sat: null,
      sun: null,
    },
    {
      fri: null,
      sat: null,
      sun: null,
    },
  ];

  //   const monthLastDate = new Date(year, month, 0).getDate();

  const setCalendar = () => {
    var tmp;
    var first = [{ date: 0, day: 0 }];
    for (let i = 1; i <= 7; ++i) {
      tmp = new Date(year, month, i).getDay();
      if (tmp === 0 || tmp === 5 || tmp === 6) {
        first = { date: i, day: tmp };
        break;
      }
    }

    switch (first.day) {
      case 5: {
        calendar[0].fri = first.date;
        calendar[0].sat = first.date + 1;
        calendar[0].sun = first.date + 2;
        first.date += 7;
        break;
      }
      case 6: {
        calendar[0].sat = first.date;
        calendar[0].sun = first.date + 1;
        first.date += 6;
        break;
      }
      case 0: {
        calendar[0].sun = first.date;
        first.date += 5;
        break;
      }
      default:
    }

    var week = 1;
    while (week < 5) {
      calendar[week].fri = first.date;
      calendar[week].sat = first.date + 1;
      calendar[week].sun = first.date + 2;
      first.date += 7;
      week += 1;
    }
  };
  setCalendar();

  const showCalendar = (
    <table className="div-attendance">
      <thead>
        <tr>
          <th>FRI</th>
          <th>SAT</th>
          <th>SUN</th>
        </tr>
      </thead>
      <tbody>
        {calendar.map((w, index) => (
          <tr>
            {w.fri < date ? (
              <th className="attendance-p">{w.fri}</th>
            ) : (
              <th className="attendance-f">{w.fri}</th>
            )}
            {w.sat < date ? (
              <th className="attendance-p">{w.sat}</th>
            ) : (
              <th className="attendance-f">{w.sat}</th>
            )}
            {w.sun < date ? (
              <th className="attendance-p">{w.sun}</th>
            ) : (
              <th className="attendance-f">{w.sun}</th>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
<<<<<<< Updated upstream
    <>
      <div className="div-attendance-profile">
        <img className="img-attendance-profile" src={profile} alt="" />
        name1
      </div>
      <div className="div-attendance-date">{today.toLocaleDateString()}</div>
      {today.getDay() === 0 || today.getDay() === 5 || today.getDay() === 6 ? (
        <div 
          className="div-attendance-check"
          onClick={async (e) => {
            const Location = await fetch("https://geolocation-db.com/json/")
            const location = await Location.json();
            today = new Date();
            location.IPv4 === "210.94.182.243" ? write(location.IPv4, today) : console.log("ip가 다릅니다.");
          }}
        >
          출석
        </div>
      ) : (
        <div className="div-attendance-check">ㅡ</div>
      )}
    </>
=======
    <div className="div-ranking">
      <div className="div-month">{today.format("YYYY.MM")}</div>
      <div className="div-attendance-section-01">{showCalendar}</div>
    </div>
>>>>>>> Stashed changes
  );
}

export default Attendance;
