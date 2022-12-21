import React, { useEffect, useState } from "react";
import {
  BiPlus,
  BiMinus,
  BiLeftArrowAlt,
  BiChevronLeft,
  BiChevronRight,
  BiCheck,
} from "react-icons/bi";
import { NavLink } from "react-router-dom";
import FormatPnum from "./FormatPnum";

const td = new Date();
var checkedList = [100];

function ManageAttendance() {
  const thisYear = td.getFullYear();
  const thisMonth = td.getMonth();
  const date = td.getDate();

  const [year, setYear] = useState(thisYear);
  const [month, setMonth] = useState(thisMonth);

  const preMonth = () => {
    if (month == 0) {
      getUserNum(year - 1, 11);
      setYear(year - 1);
      setMonth(11);
    } else {
      getUserNum(year, month - 1);
      setMonth(month - 1);
    }
    setClicked({ week: null, date: null });
  };
  const nextMonth = () => {
    if (month == 11) {
      getUserNum(year + 1, 0);
      setYear(year + 1);
      setMonth(0);
    } else {
      getUserNum(year, month + 1);
      setMonth(month + 1);
    }
    setClicked({ week: null, date: null });
  };

  var calendar = [
    [
      { date: null, attendance: null },
      { date: null, attendance: null },
      { date: null, attendance: null },
    ],
    [
      { date: null, attendance: null },
      { date: null, attendance: null },
      { date: null, attendance: null },
    ],
    [
      { date: null, attendance: null },
      { date: null, attendance: null },
      { date: null, attendance: null },
    ],
    [
      { date: null, attendance: null },
      { date: null, attendance: null },
      { date: null, attendance: null },
    ],
    [
      { date: null, attendance: null },
      { date: null, attendance: null },
      { date: null, attendance: null },
    ],
  ];

  const [attendance, setAttendance] = useState([{}]);
  const [attendanceType, setAttendanceType] = useState(0);

  var attendance0 = 0;
  var attendance1 = 0;
  var attendance2 = 0;
  var attendance3 = 0;

  const [userNum, setUserNum] = useState(0);
  const getUserNum = (year, month) => {
    const post = {
      year: year,
      month: month,
    };
    fetch("https://teammagnus.net/getUserNum", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        setUserNum(json.t);
      });
  };

  const [user, setUser] = useState([{}]);
  const getDateMember = (date) => {
    const post = {
      date: year + "-" + (month + 1) + "-" + date,
      atype: attendanceType,
    };
    fetch("https://teammagnus.net/getDateMember", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
      });
  };

  const update = () => {
    attendance.map((a) => {
      switch (a.attendance) {
        case 0:
          attendance0++;
          break;
        case 1:
          attendance1++;
          break;
        case 2:
          attendance2++;
          break;
        case 3:
          attendance3++;
          break;
        default:
      }
    });
  };
  update();
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

  const [count, setCount] = useState(null);
  const getDateAttendance = (date) => {
    const post = {
      date: year + "-" + (month + 1) + "-" + date,
      atype: attendanceType,
    };
    fetch("https://teammagnus.net/getDateAttendance", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        setCount(json.c);
      });
  };

  useEffect(() => {
    getUserNum(thisYear, thisMonth);
  }, []);

  const isNow = () => {
    if (year == thisYear && month == thisMonth) return true;
    else return false;
  };
  const [clicked, setClicked] = useState({ week: null, date: null });

  const showCalendar = (
    <table className="div-calendar">
      <thead>
        <tr>
          <th
            style={{
              backgroundColor: attendanceType == 0 ? "#d2000f" : "white",
            }}
            onClick={() => {
              setAttendanceType(0);
              setClicked({ week: null, date: null });
            }}
          >
            출석
          </th>
          <th
            style={{
              backgroundColor: attendanceType == 1 ? "#d2000f" : "white",
            }}
            onClick={() => {
              setAttendanceType(1);
              setClicked({ week: null, date: null });
            }}
          >
            지각
          </th>
          <th
            style={{
              backgroundColor: attendanceType == 2 ? "#d2000f" : "white",
            }}
            onClick={() => {
              setAttendanceType(2);
              setClicked({ week: null, date: null });
            }}
          >
            불참
          </th>
        </tr>
      </thead>
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
            {w[0].date <= date || !isNow() ? (
              <th
                className={
                  clicked.week === index && clicked.date === w[0].date
                    ? "calendar-t"
                    : "calendar-f"
                }
                onClick={() => {
                  if (w[0].date) {
                    getDateAttendance(w[0].date);
                    getDateMember(w[0].date);
                    setClicked({ week: index, date: w[0].date });
                  }
                }}
              >
                {clicked.date && clicked.date === w[0].date ? (
                  <div className="div-attendance-count">{count}명</div>
                ) : (
                  w[0].date
                )}
              </th>
            ) : (
              <th
                className={
                  clicked.week === index && clicked.date === w[0].date
                    ? "calendar-t"
                    : "calendar-p"
                }
              >
                {w[0].date}
              </th>
            )}
            {w[1].date <= date || !isNow() ? (
              <th
                className={
                  clicked.week === index && clicked.date === w[1].date
                    ? "calendar-t"
                    : "calendar-f"
                }
                onClick={() => {
                  if (w[1].date) {
                    getDateAttendance(w[1].date);
                    getDateMember(w[1].date);
                    setClicked({ week: index, date: w[1].date });
                  }
                }}
              >
                {clicked.date && clicked.date === w[1].date ? (
                  <div className="div-attendance-count">{count}명</div>
                ) : (
                  w[1].date
                )}
              </th>
            ) : (
              <th
                className={
                  clicked.week === index && clicked.date === w[1].date
                    ? "calendar-t"
                    : "calendar-p"
                }
              >
                {w[1].date}
              </th>
            )}
            {w[2].date <= date || !isNow() ? (
              <th
                className={
                  clicked.week === index && clicked.date === w[2].date
                    ? "calendar-t"
                    : "calendar-f"
                }
                onClick={() => {
                  if (w[2].date) {
                    getDateAttendance(w[2].date);
                    getDateMember(w[2].date);
                    setClicked({ week: index, date: w[2].date });
                  }
                }}
              >
                {clicked.date && clicked.date === w[2].date ? (
                  <div className="div-attendance-count">{count}명</div>
                ) : (
                  w[2].date
                )}
              </th>
            ) : (
              <th
                className={
                  clicked.week === index && clicked.date === w[2].date
                    ? "calendar-t"
                    : "calendar-p"
                }
              >
                {w[2].date}
              </th>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const [isSameName, setIsSameName] = useState([]);
  const checkAttendance = (name) => {
    const post = {
      name: name,
    };
    fetch("https://teammagnus.net/checkSameName", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.length === 0) window.alert("이름을 다시 확인해주세요.");
        else if (json.length === 1) {
          addAttendance(name, json[0].pnum);
          window.alert("추가 완료되었습니다.");
          window.location.reload();
        } else {
          setIsSameName(json);
        }
      });
  };

  const addAttendance = (name, pnum) => {
    const post = {
      name: name,
      pnum: pnum,
      atype: attendanceType,
      date: year + "-" + (month + 1) + "-" + clicked.date,
    };
    fetch("https://teammagnus.net/addAttendance", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    });
  };

  const removeAttendance = (name, pnum) => {
    const post = {
      name: name,
      pnum: pnum,
      atype: attendanceType,
      date: year + "-" + (month + 1) + "-" + clicked.date,
    };
    fetch("https://teammagnus.net/removeAttendance", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.alert("삭제 완료되었습니다.");
      window.location.reload();
    });
  };
  const [name, setName] = useState("");
  const [pnum, setPnum] = useState("");

  const onChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "pnum":
        e.target.value = FormatPnum(e.target.value);
        setPnum(e.target.value);
        break;
      default:
    }
  };

  const showAttendance = user.map((user, idx) => (
    <div key={idx} className="div-manage-attendance-section">
      <div className="div-member-name">{user.name}</div>
      <div className="div-member-pnum">{user.p}</div>
      <BiMinus
        className="button-manage_attendance-minus"
        onClick={() => {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            removeAttendance(user.name, user.p);
          }
        }}
      />
    </div>
  ));

  const [addList, setAddList] = useState([]);
  const showModal = (
    <div className="div-modal-background">
      <div className="div-modal">
        회원을 선택해주세요.
        <br />
        <br />
        {isSameName.map((m, idx) => (
          <div className="div-samename-section">
            <div className="div-samename-name">{m.name}</div>
            <div className="div-samename-pnum">{m.pnum}</div>
            <BiCheck
              className="button-member-remove-check"
              onClick={() => {
                if (checkedList[idx] == 1) {
                  checkedList[idx] = 0;
                  setAddList(addList.filter((r) => r.pnum != m.pnum));
                } else {
                  setAddList([
                    ...addList,
                    {
                      name: m.name,
                      pnum: m.pnum,
                    },
                  ]);
                  checkedList[idx] = 1;
                }
              }}
              style={checkedList[idx] == 1 && { backgroundColor: "#d2000f" }}
            />
          </div>
        ))}
        <br />
        <div className="div-samename-button-section">
          <button
            className="div-samename-button-cancel"
            onClick={() => setIsSameName([])}
          >
            취소
          </button>
          <button
            className="div-samename-button-check"
            onClick={() => {
              addList.map((m) => addAttendance(m.name, m.pnum));
              window.alert("추가 완료되었습니다.");
              window.location.reload();
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isSameName.length > 0 && showModal}
      <div className="div-attendance-section">
        <div className="div-notice-header"></div>
        <NavLink to="/manage" className="link-header">
          <BiLeftArrowAlt size="20" className="icon-back" />
        </NavLink>
        <div className="div-month">
          <BiChevronLeft
            className="icon-left"
            size="20"
            onClick={() => preMonth()}
          />
          {year}.{month + 1}
          {year == thisYear && month == thisMonth ? (
            <BiChevronRight
              className="icon-right"
              size="20"
              style={{ color: "transparent" }}
            />
          ) : (
            <BiChevronRight
              className="icon-right"
              size="20"
              onClick={() => nextMonth()}
            />
          )}
        </div>
        <div className="div-manage-attendance-section-01">{showCalendar}</div>
        {clicked.date != null && showAttendance}
        {clicked.date != null && (
          <>
            <div
              className="div-manage-attendance-section"
              style={{ marginBottom: "5vh" }}
            >
              <div className="div-member-name">
                <input
                  className="input-absence-write-name"
                  onChange={onChange}
                  name="name"
                  value={name}
                  placeholder="이름"
                  style={{ textAlign: "left" }}
                  maxLength={5}
                />
              </div>
              <BiPlus
                className="button-manage-attendance-check"
                onClick={() => {
                  if (name != "") {
                    checkAttendance(name);
                  }
                }}
                style={{
                  backgroundColor:
                    name != "" ? "#e79b42" : "rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ManageAttendance;
