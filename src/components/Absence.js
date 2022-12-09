import { React, useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { BiPlus, BiX, BiMinus, BiCheck } from "react-icons/bi";

function Absence() {
  const [name, setName] = useState("");
  const [pnum, setPnum] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState([]);

  const getAbsence = () => {
    fetch("https://teammagnus.net/getAbsence", {
      method: "post",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
      });
  };

  const addAbsence = () => {
    const post = {
      name: name,
      date: date,
      pnum: pnum,
    };
    console.log(post.query);
    fetch("https://teammagnus.net/addAbsence", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.alert("추가 완료되었습니다.");
      window.location.reload();
    });
  };

  const cancelAbsence = (name, date, pnum) => {
    const post = {
      name: name,
      date: date,
      pnum: pnum,
    };
    console.log(post.query);
    fetch("https://teammagnus.net/cancelAbsence", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    getAbsence();
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
            cancelAbsence(user.n, user.date, user.p);
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
          미통보 불참
        </div>
        <div className="div-absence-section-01">
          {showWarning}
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
            <div style={{ display: "flex", alignItems: "center" }}>
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
                if (name != "" && pnum != "" && date != "") addAbsence();
              }}
              style={{
                backgroundColor:
                  name != "" && pnum != "" && date != ""
                    ? "#e79b42"
                    : "rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Absence;
