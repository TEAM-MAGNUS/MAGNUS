import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  BiPieChartAlt,
  BiChevronLeft,
  BiChevronRight,
  BiCalendarAlt,
} from "react-icons/bi";
import { PieChart, Pie, Sector, Cell } from "recharts";
import MemberAll from "./MemberAll";

const td = new Date();

function MemberAttendance(props) {
  const thisYear = td.getFullYear();
  const thisMonth = td.getMonth();

  const name = props.name;
  const pnum = props.pnum;
  const [year, setYear] = useState(thisYear);
  const [month, setMonth] = useState(thisMonth);
  const [detailOpen, setDetailOpen] = useState(false);

  const preMonth = () => {
    if (month == 0) {
      getAttendance(year - 1, 11);
      setYear(year - 1);
      setMonth(11);
      getPre(year - 1, 11);
    } else {
      getAttendance(year, month - 1);
      setMonth(month - 1);
      getPre(year, month - 1);
    }
  };
  const nextMonth = () => {
    if (month == 11) {
      getAttendance(year + 1, 0);
      setYear(year + 1);
      setMonth(0);
      getPre(year + 1, 0);
    } else {
      getAttendance(year, month + 1);
      setMonth(month + 1);
      getPre(year, month + 1);
    }
  };
  const [isLast, setIsLast] = useState(false);
  const [join, setJoin] = useState("");
  console.log("join: " + join);
  const getPre = (year, month) => {
    console.log("getpre");
    if (month == 0) {
      setIsLast(join.substring(0, 4) >= year);
    } else {
      setIsLast(
        join.substring(0, 4) >= year &&
          parseInt(join.substring(5, 7) - 1) >= parseInt(month)
      );
    }
  };
  const getJoin = () => {
    const post = {
      pnum: pnum,
    };
    fetch("https://teammagnus.net/getJoin", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        setJoin(json.date);
        getPre();
      });
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

  const [attendance, setAttendance] = useState([
    { attendance_date: null, attendance: null },
  ]);

  var attendance0 = 0;
  var attendance1 = 0;
  var attendance2 = 0;
  var attendance3 = 0;

  const getAttendance = (year, month) => {
    attendance0 = 0;
    attendance1 = 0;
    attendance2 = 0;
    attendance3 = 0;

    const post = {
      year: year,
      month: month,
      name: name,
      pnum: pnum,
    };
    fetch("https://teammagnus.net/getAttendance", {
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
        update();
      });
  };

  const update = () => {
    console.log("update");
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

  useEffect(() => {
    getAttendance(thisYear, thisMonth);
    getJoin();
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
          {name}
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
          {payload.name} {value}
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

  return (
    <div className="div-member-attendance-section">
      <BiPieChartAlt
        size="20"
        className="icon-pie"
        onClick={() => setDetailOpen(false)}
        style={{ color: !detailOpen && "#d2000f" }}
      />
      <BiCalendarAlt
        size="20"
        className="icon-calendar"
        onClick={() => setDetailOpen(true)}
        style={{ color: detailOpen && "#d2000f" }}
      />
      <div className="div-attendance-section">
        <div className="div-month">
          {join == thisYear + "." + (thisMonth + 1) || isLast ? (
            <BiChevronLeft
              className="icon-left"
              size="20"
              style={{ color: "transparent" }}
            />
          ) : (
            <BiChevronLeft
              className="icon-left"
              size="20"
              onClick={() => preMonth()}
            />
          )}
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
        {detailOpen ? (
          <div className="div-attendance-section-01">{showCalendar}</div>
        ) : (
          <>
            <div className="div-member-piechart-01">{pieChart}</div>
            <MemberAll name={name} pnum={pnum} />
          </>
        )}
      </div>
    </div>
  );
}

export default MemberAttendance;
