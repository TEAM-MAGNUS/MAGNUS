import { React, useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { BiPlus, BiX, BiMinus, BiCheck } from "react-icons/bi";
import FormatDate from "./FormatDate";

var checkedList = [100];
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

  const [isSameName, setIsSameName] = useState([]);
  const checkInjured = (name) => {
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
          addInjured(name, json[0].pnum);
          window.alert("추가 완료되었습니다.");
          window.location.reload();
        } else {
          setIsSameName(json);
        }
      });
  };

  const addInjured = (name, pnum) => {
    const post = {
      name: name,
      pnum: pnum,
      date: date,
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
      case "date":
        e.target.value = FormatDate(e.target.value);
        setDate(e.target.value);
        break;
      default:
    }
  };

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
              addList.map((m) => addInjured(m.name, m.pnum));
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
    <>
      {isSameName.length > 0 && showModal}
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
              <input
                className="input-absence-write-name"
                onChange={onChange}
                name="name"
                value={name}
                placeholder="이름"
                maxLength={5}
              />
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
                  maxLength={10}
                />
              </div>
              <BiPlus
                className="button-absence-minus"
                onClick={() => {
                  if (name !== "" && date !== "") checkInjured(name);
                }}
                style={{
                  backgroundColor:
                    name !== "" && date !== ""
                      ? "#e79b42"
                      : "rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
            {showWarning}
          </div>
        </div>
      </div>
    </>
  );
}

export default Injured;
