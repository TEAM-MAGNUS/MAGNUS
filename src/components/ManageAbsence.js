import React, { useCallback, useEffect, useState } from "react";
import {
  BiPlus,
  BiX,
  BiMinus,
  BiCheck,
  BiLeftArrowAlt,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { NavLink } from "react-router-dom";

const td = new Date();

function ManageAbsence() {
  const thisYear = td.getFullYear();
  const thisMonth = td.getMonth();
  const date = td.getDate();

  const [year, setYear] = useState(thisYear);
  const [month, setMonth] = useState(thisMonth);

  const preMonth = () => {
    if (month == 0) {
      getWholeAttendance(year - 1, 11);
      getUserNum(year - 1, 11);
      setYear(year - 1);
      setMonth(11);
    } else {
      getWholeAttendance(year, month - 1);
      getUserNum(year, month - 1);
      setMonth(month - 1);
    }
    setClicked({ week: null, date: null });
  };
  const nextMonth = () => {
    if (month == 11) {
      getWholeAttendance(year + 1, 0);
      getUserNum(year + 1, 0);
      setYear(year + 1);
      setMonth(0);
    } else {
      getWholeAttendance(year, month + 1);
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
  const getWholeAttendance = (year, month) => {
    attendance0 = 0;
    attendance1 = 0;
    attendance2 = 0;
    attendance3 = 0;

    const post = {
      year: year,
      month: month,
    };
    fetch("https://teammagnus.net/getWholeAttendance", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        setAttendance(json);
        update();
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
    getWholeAttendance(thisYear, thisMonth);
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
          <th>FRI</th>
          <th>SAT</th>
          <th>SUN</th>
        </tr>
      </thead>
      <tbody>
        {calendar.map((w, index) => (
          <tr>
            {w[0].date < date || !isNow() ? (
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
            {w[1].date < date || !isNow() ? (
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
            {w[2].date < date || !isNow() ? (
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

  const data = [
    { name: "출석", value: attendance0 },
    { name: "지각", value: attendance1 },
    { name: "불참", value: attendance2 },
    { name: "미통불", value: attendance3 },
  ];
  const COLORS = ["#d2000f", "#d2000f", "black", "black"];

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 40) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          style={{ fontSize: "20px" }}
        >
          평균
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 4}
          outerRadius={outerRadius + 8}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 10}
          y={ey}
          textAnchor={textAnchor}
          fill="black"
          style={{ fontSize: "15px" }}
        >
          {payload.name} {(value / userNum).toFixed(1)}
        </text>
        <text
          x={ex + (cos >= 0 ? -1 : 1)}
          y={ey}
          dy={20}
          textAnchor={textAnchor}
          fill="black"
          style={{ fontSize: "12px" }}
        >
          ({(percent * 100).toFixed(1)}%)
        </text>
      </g>
    );
  };

  const pieChart = (
    <PieChart width={400} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        innerRadius={85}
        outerRadius={110}
        paddingAngle={3}
        dataKey="value"
        isAnimationActive={true}
        onClick={onPieEnter}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );

  const addAttendance = (name, pnum) => {
    const post = {
      name: name,
      date: date,
    };
    fetch("https://teammagnus.net/addAttendance", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(window.location.reload());
  };
  const removeAttendance = (name, date) => {
    const post = {
      name: name,
      date: date,
    };
    fetch("https://loaclhost/removeAttendance", {
      // fetch("https://teammagnus.net/removeAttendance", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(window.location.reload());
  };
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pnum, setPnum] = useState("");

  const onChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "pnum":
        setPnum(e.target.value);
        break;
      default:
    }
  };

  const addPage = (
    <>
      <div className="div-absence-input">
        <input
          className="input-absence-write-name"
          onChange={onChange}
          name="name"
          value={name}
          placeholder="이름"
        />
        <input
          className="input-absence-write-date"
          onChange={onChange}
          name="pnum"
          value={pnum}
          placeholder="000-0000-0000"
        />
        {name != "" && date != "" && (
          <BiCheck
            className="icon-absence-close"
            onClick={() => addAttendance(name, pnum)}
            style={{ backgroundColor: "#e79b42" }}
          />
        )}
      </div>
    </>
  );

  const showAttendance = user.map((user, idx) => (
    <div key={idx} className="div-manage-attendance-section">
      <div className="div-member-name">{user.name}</div>
      <div className="div-member-pnum">{user.p}</div>
      <BiMinus
        className="button-manage_attendance-minus"
        onClick={() => {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            removeAttendance(user.name, user.pnum);
          }
        }}
      />
    </div>
  ));
  return (
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
        {(year != thisYear || month != thisMonth) && (
          <BiChevronRight
            className="icon-right"
            size="20"
            onClick={() => nextMonth()}
          />
        )}
      </div>
      <div className="div-attendance-section-01">{showCalendar}</div>
      {clicked.date != null && showAttendance}

      {clicked.date != null && (
        <>
          <div className="div-manage-attendance-section">
            {isOpen ? (
              <BiX
                className="button-manage-attendance-write"
                onClick={() => {
                  setOpen(false);
                }}
              />
            ) : (
              <BiPlus
                className="button-manage-attendance-write"
                onClick={() => {
                  setOpen(true);
                }}
              />
            )}
          </div>
          <div
            className="div-manage-attendance-section"
            style={{ justifyContent: " right" }}
          >
            <BiCheck
              className="button-manage-attendance-check"
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ManageAbsence;
