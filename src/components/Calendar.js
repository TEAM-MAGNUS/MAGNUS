import React, { useState } from "react";
import dayjs from "dayjs";
import { HiPlus, HiX, HiMinus, HiCheck } from "react-icons/hi";

const today = dayjs(new Date());
const td = new Date();

function Calendar() {
  const year = td.getFullYear();
  const month = td.getMonth();
  const date = td.getDate();

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

    var week = 1;
    while (week < 5) {
      calendar[week][0].date = first.date;
      calendar[week][1].date = first.date + 1;
      calendar[week][2].date = first.date + 2;
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
      query:
        "SELECT schedule from magnus_schedule WHERE (schedule_date = '" +
        year +
        "-" +
        (month + 1) +
        "-" +
        date +
        "');",
    };
    fetch("http://15.165.207.25:80/SQL1", {
      // fetch("http://localhost:80/SQL1", {
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
        {text === "" ? (
          <></>
        ) : (
          <HiCheck
            className="button-calendar-schedule-add"
            onClick={() => addSchedule(now.date, text)}
          />
        )}
      </div>
    </>
  );

  const addSchedule = (date, schedule) => {
    const post = {
      query:
        "INSERT INTO magnus_schedule VALUES ('" +
        year +
        "-" +
        (month + 1) +
        "-" +
        date +
        "', '" +
        schedule +
        "');",
    };
    console.log(post.query);
    fetch("http://15.165.207.25:80/SQL1", {
      // fetch("http://localhost:80/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(window.location.reload());
  };

  const removeSchedule = (date) => {
    const post = {
      query:
        "DELETE FROM magnus_schedule WHERE ( schedule_date = '" +
        year +
        "-" +
        (month + 1) +
        "-" +
        date +
        "');",
    };
    console.log(post.query);
    fetch("http://15.165.207.25:80/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(window.location.reload());
  };

  const showSchedule = (
    <>
      <div className="div-calendar-schedule-section">
        {/* <div className="div-calendar-schedule-01">
          {year + "." + (month + 1) + "." + now.date}
        </div> */}
        <div className="div-calendar-schedule-02">
          {isOpen2 ? writeSchedule : schedule}
        </div>
      </div>

      {schedule === "등록된 일정이 없습니다." ? (
        isOpen2 ? (
          <HiX
            className="button-calendar-schedule-write"
            onClick={() => {
              setOpen2(false);
              setText("");
            }}
          />
        ) : (
          <HiPlus
            className="button-calendar-schedule-write"
            onClick={() => {
              setOpen2(true);
            }}
          />
        )
      ) : (
        <HiMinus
          className="button-calendar-schedule-write"
          onClick={() => {
            if (window.confirm("정말 삭제하시겠습니까?")) {
              removeSchedule(now.date);
            }
          }}
        />
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
            {w[0].date < date ? (
              <th className="calendar-p">{w[0].date}</th>
            ) : (
              <th
                className={
                  clicked.week === index && clicked.date === w[0].date
                    ? "calendar-t"
                    : "calendar-f"
                }
                onClick={() => {
                  openSchedule(index, w[0].date, 0);
                  setClicked({ week: index, date: w[0].date });
                }}
              >
                {w[0].date}
              </th>
            )}
            {w[1].date < date ? (
              <th className="calendar-p">{w[1].date}</th>
            ) : (
              <th
                className={
                  clicked.week === index && clicked.date === w[1].date
                    ? "calendar-t"
                    : "calendar-f"
                }
                onClick={() => {
                  openSchedule(index, w[1].date, 1);
                  setClicked({ week: index, date: w[1].date });
                }}
              >
                {w[1].date}
              </th>
            )}
            {w[2].date < date ? (
              <th className="calendar-p">{w[2].date}</th>
            ) : (
              <th
                className={
                  clicked.week === index && clicked.date === w[2].date
                    ? "calendar-t"
                    : "calendar-f"
                }
                onClick={() => {
                  openSchedule(index, w[2].date, 2);
                  setClicked({ week: index, date: w[2].date });
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
      <div className="div-month">{today.format("YYYY.MM")}</div>
      <div className="div-attendance-section-01">{showCalendar}</div>
      {isOpen1 ? showSchedule : <></>}
    </div>
  );
}

export default Calendar;
