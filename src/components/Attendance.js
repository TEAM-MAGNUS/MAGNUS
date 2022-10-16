import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { PieChart, Pie, Sector, Cell } from "recharts";
import ReactFullpage from "@fullpage/react-fullpage";
import { IoIosArrowDown } from "react-icons/io";

const today = dayjs(new Date());
const td = new Date();

function Attendance() {
  const year = td.getFullYear();
  const month = td.getMonth();

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

  //   const monthLastDate = new Date(year, month, 0).getDate();

  const [attendance, setAttendance] = useState([
    { attendance_date: null, attendance: null },
  ]);

  var attendance0 = 0;
  var attendance1 = 0;
  var attendance2 = 0;
  var attendance3 = 0;

  const getAttendance = () => {
    const post = {
      query:
        "SELECT attendance_date, attendance from magnus_attendance WHERE (YEAR(attendance_date) = " +
        year +
        " AND MONTH(attendance_date) = " +
        (month + 1) +
        " AND id = '" +
        "id0" +
        "');",
    };
    fetch("http://15.165.207.25:80/SQL2", {
      // fetch("http://localhost:80/SQL2", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        json.map((j) => {
          j.attendance_date = dayjs(j.attendance_date).format("D");
        });

        setAttendance(json);
      });
  };
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

  useEffect(() => {
    getAttendance();
  }, []);

  const setColor = (date) => {
    var t = attendance.find((a) => a.attendance_date == date);
    if (t) {
      switch (t.attendance) {
        case 0:
          return "attendance-0";
        case 1:
          return "attendance-1";
        case 2:
          return "attendance-2";
        case 3:
          return "attendance-3";
        default:
      }
    } else return "attendance-f";
  };

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
            <th className={setColor(w[0].date)}>{w[0].date}</th>
            <th className={setColor(w[1].date)}>{w[1].date}</th>
            <th className={setColor(w[2].date)}>{w[2].date}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const [isOpen, setIsOpen] = useState(false);
  const info = (
    <div className="div-attendance-section-info">
      <div className="div-attendance-info ">
        <div className="div-attendance-info-01">O</div>출석
      </div>
      <div className="div-attendance-info ">
        <div className="div-attendance-info-02">O</div>지각
      </div>
      <div className="div-attendance-info ">
        <div className="div-attendance-info-03">O</div>불참
      </div>
      <div className="div-attendance-info ">
        <div className="div-attendance-info-04">O</div>미통보불참
      </div>
    </div>
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
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
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
          {payload.name}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1)}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="black"
          style={{ fontSize: "12px" }}
        >
          {value}({(percent * 100).toFixed(1)}%)
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

  return (
    <>
      <ReactFullpage
        scrollOverflow={true}
        render={({ fullpageApi }) => (
          <div id="fullpage-wrapper">
            <div className="section">
              <div className="div-attendance-section">
                <div className="div-month">{today.format("YYYY.MM")}</div>
                <div className="div-attendance-piechart-01">{pieChart}</div>
                <div className="div-attendance-piechart-02">
                  {(
                    ((attendance0 + attendance1) / attendance.length) *
                    100
                  ).toFixed(1)}
                  %
                </div>
              </div>
              <IoIosArrowDown
                className="icon-main-arrow-down"
                size="20"
                onClick={() => fullpageApi.moveSectionDown()}
              />
            </div>
            <div className="section">
              <div className="div-attendance-section">
                <div className="div-month">{today.format("YYYY.MM")}</div>
                {isOpen ? info : <></>}
                <div className="div-attendance-section-01">
                  {showCalendar}
                  <AiOutlineInfoCircle
                    className="icon-attendance-info"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </>
  );
}

export default Attendance;
