import React, { useState } from "react";
import dayjs from "dayjs";

const today = dayjs(new Date());
const td = new Date();

function Attendance() {
  const year = td.getFullYear();
  const month = td.getMonth();
  const date = td.getDate();

  var calendar = [
    {
      fri: null,
      sat: null,
      sun: null,
      fri_schedule: "a",
      sat_schedule: "b",
      sun_schedule: "c",
    },
    {
      fri: null,
      sat: null,
      sun: null,
      fri_schedule: "d",
      sat_schedule: "e",
      sun_schedule: "f",
    },
    {
      fri: null,
      sat: null,
      sun: null,
      fri_schedule: "g",
      sat_schedule: "h",
      sun_schedule: "i",
    },
    {
      fri: null,
      sat: null,
      sun: null,
      fri_schedule: "j",
      sat_schedule: "k",
      sun_schedule: "l",
    },
    {
      fri: null,
      sat: null,
      sun: null,
      fri_schedule: "m",
      sat_schedule: "n",
      sun_schedule: "o",
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

  const [isOpen, setOpen] = useState(false);
  const [now, setNow] = useState({ week: 0, date: 0, day: "" });

  const showCalendar = (
    <table className="div-calendar">
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
              <th className="calendar-p">{w.fri}</th>
            ) : (
              <th className="calendar-f">{w.fri}</th>
            )}
            {w.sat < date ? (
              <th className="calendar-p">{w.sat}</th>
            ) : (
              <th className="calendar-f">{w.sat}</th>
            )}
            {w.sun < date ? (
              <th className="calendar-p">{w.sun}</th>
            ) : (
              <th className="calendar-f">{w.sun}</th>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="div-ranking">
      <div className="div-month">{today.format("YYYY.MM")}</div>
      <div className="div-attendance-section-01">{showCalendar}</div>
    </div>
  );
}

export default Attendance;
