import { React, useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { HiPlus, HiX, HiMinus, HiCheck } from "react-icons/hi";

function Absence() {
  const [user, setUser] = useState([{}]);

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

  const addAbsence = (name, date) => {
    const post = {
      name: name,
      date: date,
    };
    console.log(post.query);
    fetch("https://teammagnus.net/addAbsence", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(window.location.reload());
  };

  const cancelAbsence = (name, date) => {
    const post = {
      name: name,
      date: date,
    };
    console.log(post.query);
    fetch("https://teammagnus.net/cancelAbsence", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(window.location.reload());
  };

  useEffect(() => {
    getAbsence();
  }, []);

  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const onChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
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
          name="date"
          value={date}
          placeholder="YYYY.MM.DD"
        />
        {name == "" || date == "" ? (
          <></>
        ) : (
          <HiCheck
            className="icon-absence-close"
            onClick={() => addAbsence(name, date)}
          />
        )}
      </div>
    </>
  );

  const showWarning = user.map((user, idx) => (
    <div key={idx} className="div-absence-section-02">
      <div>{user.name}</div>
      <div>{user.date}</div>
      <HiMinus
        className="button-absence-minus"
        onClick={() => {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            cancelAbsence(user.name, user.date);
          }
        }}
      />
    </div>
  ));
  return (
    <div>
      <div className="div-attendance-section">
        <div className="div-month">
          <NavLink to="/manage" className="link-header">
            <HiOutlineArrowLeft size="20" className="icon-back" />
          </NavLink>
          미통보 불참
        </div>
        {isOpen ? (
          <>
            <HiX
              className="button-notice-write"
              onClick={() => {
                setOpen(false);
                setName("");
                setDate("");
              }}
            />
          </>
        ) : (
          <HiPlus
            className="button-notice-write"
            onClick={() => {
              setOpen(true);
            }}
          />
        )}
        <div className="div-absence-section-01">
          {showWarning}
          {isOpen ? addPage : <></>}
        </div>
      </div>
    </div>
  );
}

export default Absence;
