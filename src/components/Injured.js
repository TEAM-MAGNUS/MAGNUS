import { React, useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { BiPlus, BiX, BiMinus, BiCheck } from "react-icons/bi";

function Injured() {
  const [name, setName] = useState("");
  const [pnum, setPnum] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState([]);

  const getInjured = () => {
    fetch("https://teammagnus.net/getInjured", {
      method: "post",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
      });
  };

  const addInjured = () => {
    const post = {
      name: name,
      date: date,
      pnum: pnum,
    };
    console.log(post);
    fetch("https://teammagnus.net/addInjured", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.alert("추가 완료되었습니다.");
      window.location.reload();
    });
  };

  const cancelInjured = (name, date, pnum) => {
    const post = {
      name: name,
      date: date,
      pnum: pnum,
    };
    console.log(post.query);
    fetch("https://teammagnus.net/cancelInjured", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    getInjured();
  }, []);

  const onChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "pnum":
        setPnum(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      default:
    }
  };

  const showWarning = user.map((user, idx) => (
    <div key={idx} className="div-absence-section-02">
      <div className="div-absence-name-pnum">
        <div className="div-absence-name">{user.n}</div>
        <div className="div-absence-pnum ">{user.p}</div>
      </div>
      <div className="div-absence-date">{user.date}</div>
      <BiMinus
        className="button-absence-minus"
        onClick={() => {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            cancelInjured(user.n, user.date, user.p);
          }
        }}
      />
    </div>
  ));
  return (
    <div className="div-absence">
      <div className="div-attendance-section">
        <div className="div-notice-header"></div>
        <div className="div-month-title">
          <NavLink to="/manage" className="link-header">
            <BiLeftArrowAlt size="20" className="icon-back" />
          </NavLink>
          병결
        </div>
        <div className="div-absence-section-01">
          <div className="div-absence-section-02">
            <div className="div-absence-name-pnum">
              <input
                className="input-absence-write-name"
                onChange={onChange}
                name="name"
                value={name}
                placeholder="이름"
              />
              <input
                className="input-absence-write-pnum"
                onChange={onChange}
                name="pnum"
                value={pnum}
                placeholder="000-0000-0000"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                className="input-absence-write-date"
                onChange={onChange}
                name="date"
                value={date}
                placeholder="YYYY.MM.DD"
              />
            </div>
            <BiPlus
              className="button-absence-minus"
              onClick={() => {
                if (name != "" && pnum != "" && date != "") addInjured();
              }}
              style={{
                backgroundColor:
                  name != "" && pnum != "" && date != ""
                    ? "#e79b42"
                    : "rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
          {showWarning}
        </div>
      </div>
    </div>
  );
}

export default Injured;
