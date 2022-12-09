import React, { useEffect, useState, useCallback } from "react";
import { BiX, BiLeftArrowAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import MemberAttendance from "./MemberAttendance";
import { PieChart, Pie, Sector, Cell } from "recharts";

function JoinDate() {
  const [member, setMember] = useState([{}]);
  const [joinDateList, setJoinDateList] = useState([{}]);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [joinDate, setJoinDate] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [name, setName] = useState("");
  const [pnum, setPnum] = useState("");

  const getJoinDate = () => {
    fetch("https://teammagnus.net/getJoinDate", {
      method: "post",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setJoinDateList(json);
      });
  };

  const getJoinDateMember = (date) => {
    const post = {
      j: date,
      id: window.localStorage.getItem("id"),
    };
    console.log(post.j);
    fetch("https://teammagnus.net/getJoinDateMember", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMember(json);
      });
  };

  const [attendance, setAttendance] = useState([{}]);

  var attendance0 = 0;
  var attendance1 = 0;
  var attendance2 = 0;
  var attendance3 = 0;

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

  const getJoinDateAttendance = (date) => {
    attendance0 = 0;
    attendance1 = 0;
    attendance2 = 0;
    attendance3 = 0;

    const post = {
      j: date,
    };
    console.log(post.j);
    fetch("https://teammagnus.net/getJoinDateAttendance", {
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
  update();

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
    const sx = cx + (outerRadius + 5) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 10) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 5;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={4}
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
          innerRadius={outerRadius + 2}
          outerRadius={outerRadius + 4}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 5}
          y={ey}
          textAnchor={textAnchor}
          fill="black"
          style={{ fontSize: "15px" }}
        >
          {payload.name} {(value / member.length).toFixed(1)}
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

  console.log("0: " + attendance0);
  console.log("1: " + attendance1);
  console.log("2: " + attendance2);
  console.log("3: " + attendance3);

  const pieChart = (
    <PieChart width={400} height={200}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        innerRadius={42}
        outerRadius={55}
        paddingAngle={2}
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
  useEffect(() => {
    getJoinDate();
  }, []);

  const showJoinDate = joinDateList.map((date, idx) => (
    <>
      {!isMemberOpen && (
        <div
          key={idx}
          className="div-joindate-section"
          onClick={() => {
            setJoinDate(date.j);
            getJoinDateMember(date.j);
            getJoinDateAttendance(date.j);
            setIsMemberOpen(true);
          }}
        >
          {date.j}
        </div>
      )}
    </>
  ));

  const showMember = member.map((user, idx) => (
    <>
      <div
        key={idx}
        className="div-joindate-section"
        onClick={() => {
          setIsDetailOpen(true);
          setName(user.name);
          setPnum(user.pnum);
        }}
      >
        <div className="div-member-name">{user.name}</div>
        <div className="div-joindate-pnum">{user.pnum}</div>
      </div>
    </>
  ));

  return (
    <>
      {isDetailOpen ? (
        <>
          <MemberAttendance name={name} pnum={pnum} />
          <BiX
            size="20"
            className="icon-back"
            onClick={() => setIsDetailOpen(false)}
          />
        </>
      ) : (
        <div className="div-ranking">
          <div className="div-notice-header"></div>
          {isMemberOpen ? (
            <>
              <BiLeftArrowAlt
                size="20"
                className="icon-back"
                onClick={() => setIsMemberOpen(false)}
              />
              <div className="div-month-title" style={{ fontSize: "25px" }}>
                {joinDate}
              </div>
              {pieChart}
              <div style={{ paddingBottom: "5vh" }}>{showMember}</div>
            </>
          ) : (
            <>
              <NavLink to="/manage" className="link-header">
                <BiLeftArrowAlt size="20" className="icon-back" />
              </NavLink>
              <div className="div-month-title">가입 기수</div>
              <div className="div-member-section-01">{showJoinDate}</div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default JoinDate;
