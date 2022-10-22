import React, { useEffect, useState } from "react";
import {
  HiPlus,
  HiX,
  HiMinus,
  HiCheck,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

const td = new Date();

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
        if (window.sessionStorage.getItem("m") == 1) {
          window.sessionStorage.setItem("m", 0);
          window.location.reload();
        }
        window.sessionStorage.setItem("m", 0);
      }
    });
}

function Calendar() {
  const thisYear = td.getFullYear();
  const thisMonth = td.getMonth();
  const date = td.getDate();

  const [year, setYear] = useState(thisYear);
  const [month, setMonth] = useState(thisMonth);

  const preMonth = () => {
    if (month == 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
    setOpen1(false);
    setClicked({ week: null, date: null });
  };
  const nextMonth = () => {
    if (month == 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
    setOpen1(false);
    setClicked({ week: null, date: null });
  };

  const isNow = () => {
    if (year == thisYear && month == thisMonth) return true;
    else return false;
  };

  var calendar = [
    [
      { date: null, schedule: "a" },
      { date: null, schedule: "b" },
      { date: null, schedule: "v" },
    ],
    [
      { date: null, schedule: "a" },
      { date: null, schedule: "b" },
      { date: null, schedule: "c" },
    ],
    [
      { date: null, schedule: "d" },
      { date: null, schedule: "e" },
      { date: null, schedule: "f" },
    ],
    [
      { date: null, schedule: "g" },
      { date: null, schedule: "h" },
      { date: null, schedule: "i" },
    ],
    [
      { date: null, schedule: "j" },
      { date: null, schedule: "k" },
      { date: null, schedule: "l" },
    ],
  ];

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
        calendar[0][0].date = first.date;
        calendar[0][1].date = first.date + 1;
        calendar[0][2].date = first.date + 2;
        first.date += 7;
        break;
      }
      case 6: {
        calendar[0][1].date = first.date;
        calendar[0][2].date = first.date + 1;
        first.date += 6;
        break;
      }
      case 0: {
        calendar[0][2].date = first.date;
        first.date += 5;
        break;
      }
      default:
    }

    const lastDate = new Date(year, month + 1, 0).getDate();
    var week = 1;
    while (week < 5) {
      if (first.date <= lastDate) calendar[week][0].date = first.date;
      if (first.date + 1 <= lastDate) calendar[week][1].date = first.date + 1;
      if (first.date + 2 <= lastDate) calendar[week][2].date = first.date + 2;

      first.date += 7;
      week += 1;
    }
  };
  setCalendar();

  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  const [now, setNow] = useState({ week: 0, date: 0, day: 0 });
  const [schedule, setSchedule] = useState("");

  const openSchedule = (week, date, day) => {
    setNow({ week: week, date: date, day: day });
    getSchedule(date);
  };

  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const getSchedule = (date) => {
    const post = {
      year: year,
      month: month,
      date: date,
    };
    fetch("https://teammagnus.net/getSchedule", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        setSchedule(json.schedule);
      })
      .catch((e) => {
        setSchedule("등록된 일정이 없습니다.");
      })
      .then(() => {
        setOpen1(true);
      });
  };

  const writeSchedule = (
    <>
      <div className="div-calendar-schedule-write">
        <input
          className="input-calendar-schedule-write"
          maxLength={30}
          onChange={onChange}
          value={text}
        ></input>
      </div>
    </>
  );

  const addSchedule = (date, schedule) => {
    const post = {
      year: year,
      month: month,
      date: date,
      schedule: schedule,
    };
    console.log(post.query);
    fetch("https://teammagnus.net/addSchedule", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.location.reload();
    });
  };

  const removeSchedule = (date) => {
    const post = {
      year: year,
      month: month,
      date: date,
    };
    console.log(post.query);
    fetch("https://teammagnus.net/removeSchedule", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.location.reload();
    });
  };

  const showSchedule = (
    <>
      <div className="div-calendar-schedule-section">
        <div className="div-calendar-schedule-02">
          {isOpen2 ? writeSchedule : schedule}
        </div>
      </div>

      {schedule === "등록된 일정이 없습니다." ? (
        isOpen2 ? (
          <>
            <HiX
              className="button-calendar-schedule-write"
              onClick={() => {
                setOpen2(false);
                setText("");
              }}
            />
            {text === "" ? (
              <></>
            ) : (
              <HiCheck
                className="button-calendar-schedule-write"
                style={{ backgroundColor: "#e79b42" }}
                onClick={() => addSchedule(now.date, text)}
              />
            )}
          </>
        ) : (
          window.sessionStorage.getItem("m") == 1 && (
            <HiPlus
              className="button-calendar-schedule-write"
              onClick={() => {
                setOpen2(true);
              }}
            />
          )
        )
      ) : (
        window.sessionStorage.getItem("m") == 1 && (
          <HiMinus
            className="button-calendar-schedule-write"
            onClick={() => {
              if (window.confirm("정말 삭제하시겠습니까?")) {
                removeSchedule(now.date);
              }
            }}
          />
        )
      )}
    </>
  );

  const [clicked, setClicked] = useState({ week: null, date: null });

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
            {w[0].date < date && isNow() ? (
              <th className="calendar-p">{w[0].date}</th>
            ) : (
              <th
                className={
                  clicked.week === index && clicked.date === w[0].date
                    ? "calendar-t"
                    : "calendar-f"
                }
                onClick={() => {
                  if (w[0].date) {
                    openSchedule(index, w[0].date, 0);
                    setClicked({ week: index, date: w[0].date });
                    isManager();
                  }
                }}
              >
                {w[0].date}
              </th>
            )}
            {w[1].date < date && isNow() ? (
              <th className="calendar-p">{w[1].date}</th>
            ) : (
              <th
                className={
                  clicked.week === index && clicked.date === w[1].date
                    ? "calendar-t"
                    : "calendar-f"
                }
                onClick={() => {
                  if (w[1].date) {
                    openSchedule(index, w[1].date, 1);
                    setClicked({ week: index, date: w[1].date });
                    isManager();
                  }
                }}
              >
                {w[1].date}
              </th>
            )}
            {w[2].date < date && isNow() ? (
              <th className="calendar-p">{w[2].date}</th>
            ) : (
              <th
                className={
                  clicked.week === index && clicked.date === w[2].date
                    ? "calendar-t"
                    : "calendar-f"
                }
                onClick={() => {
                  if (w[2].date) {
                    openSchedule(index, w[2].date, 2);
                    setClicked({ week: index, date: w[2].date });
                    isManager();
                  }
                }}
              >
                {w[2].date}
              </th>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="div-calendar-section">
      <div className="div-month">
        {(year != thisYear || month != thisMonth) && (
          <HiChevronLeft
            className="icon-left"
            size="20"
            onClick={() => preMonth()}
          />
        )}
        {year}.{month + 1}
        <HiChevronRight
          className="icon-right"
          size="20"
          onClick={() => nextMonth()}
        />
      </div>
      <div className="div-attendance-section-01">{showCalendar}</div>
      {isOpen1 && showSchedule}
    </div>
  );
}

export default Calendar;
