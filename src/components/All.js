import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

import { PieChart, Pie, Sector, Cell } from "recharts";
import Connection from "./Connection";
const td = new Date();

function All(props) {
  const name = props.name;
  const pnum = props.pnum;
  const thisYear = td.getFullYear();
  const thisMonth = td.getMonth();

  // console.log("name: " + name);
  // console.log("pnum: " + pnum);

  const [year, setYear] = useState(thisYear);
  const [month, setMonth] = useState(thisMonth);
  const [attendance, setAttendance] = useState([
    { attendance_date: null, attendance: null },
  ]);

  var attendance0 = 0;
  var attendance1 = 0;
  var attendance2 = 0;
  var attendance3 = 0;

  const [join, setJoin] = useState("");
  const getJoin = () => {
    Connection("/getJoin", {
      pnum: pnum,
    }).then((res) => {
      setJoin(res.date);
    });
  };

  const getAll = () => {
    attendance0 = 0;
    attendance1 = 0;
    attendance2 = 0;
    attendance3 = 0;

    Connection("/getAll", {
      pnum: pnum,
    }).then((res) => {
      res.map((j) => {
        j.attendance_date = dayjs(j.attendance_date).format("D");
      });

      setAttendance(res);
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

  useEffect(() => {
    getAll();
    getJoin();
  }, []);

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
    <>
      <div className="div-attendance-section">
        <div className="div-month">
          {join} ~ {year}.{month + 1}
        </div>
        <div className="div-attendance-piechart-01">{pieChart}</div>
        <div className="div-attendance-piechart-02">
          {((attendance0 / attendance.length) * 100).toFixed(1)}%
        </div>
      </div>
    </>
  );
}

export default All;
