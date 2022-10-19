import React, { useEffect, useState } from "react";
import {
  HiPlus,
  HiX,
  HiCheck,
  HiMinus,
  HiChevronDown,
  HiChevronUp,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import MemberAttendance from "./MemberAttendance";

function Member() {
  const [member, setMember] = useState([{}]);

  const getMember = (order1 = "name", order2 = "asc") => {
    const post = {
      order1: order1,
      order2: order2,
    };
    fetch("https://teammagnus.net/getMember", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        setMember(json);
      });
  };

  useEffect(() => {
    getMember();
  }, []);

  const [newName, setNewName] = useState("");
  const [newPnum, setNewPnum] = useState("");
  const [newJoindate, setNewJoindate] = useState("");
  const [addPageOpen, setAddPageOpen] = useState(false);

  const onChange = (e) => {
    switch (e.target.name) {
      case "name":
        setNewName(e.target.value);
        break;
      case "pnum":
        setNewPnum(e.target.value);
        break;
      case "joindate":
        setNewJoindate(e.target.value);
        break;
      default:
    }
  };

  const addMember = () => {
    const post = {
      name: newName,
      pnum: newPnum,
      join_date: newJoindate,
    };
    fetch("https://teammagnus.net/addMember", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then(window.location.reload());
  };
  const addPage = (
    <>
      <div className="div-member-input">
        <input
          className="input-member-write-name"
          onChange={onChange}
          name="name"
          value={newName}
          placeholder="이름"
        />
        <input
          className="input-member-write-pnum"
          onChange={onChange}
          name="pnum"
          value={newPnum}
          placeholder="000-0000-0000"
        />
        <input
          className="input-member-write-joindate"
          onChange={onChange}
          name="joindate"
          value={newJoindate}
          placeholder="YYYY.MM.DD"
        />
      </div>
    </>
  );

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [pnum, setPnum] = useState("");

  const showMember = member.map((user, idx) => (
    <>
      {!isOpen && (
        <div
          key={idx}
          className="div-member-section"
          onClick={() => {
            // window.scrollTo(0, 0);
            setIsOpen(true);
            setName(user.name);
            setPnum(user.pnum);
          }}
        >
          <div className="div-member-name">{user.name}</div>
          <div className="div-member-pnum">{user.pnum}</div>
          <div className="div-member-join">{user.join_date}</div>
        </div>
      )}
    </>
  ));

  const [isColor, setIsColor] = useState(0);

  return (
    <>
      {isOpen ? (
        <>
          <MemberAttendance name={name} pnum={pnum} />
        </>
      ) : (
        <div className="div-ranking">
          <div className="div-notice-header"></div>
          <NavLink to="/manage" className="link-header">
            <HiOutlineArrowLeft size="20" className="icon-back" />
          </NavLink>
          <div className="div-month">회원 관리</div>
          {addPageOpen ? (
            <HiX
              className="button-member-plus"
              onClick={() => {
                setAddPageOpen(false);
                setNewName("");
                setNewPnum("");
                setNewJoindate("");
              }}
            />
          ) : (
            <>
              <HiPlus
                className="button-member-plus"
                onClick={() => {
                  setAddPageOpen(true);
                }}
              />
              <HiMinus
                className="button-member-minus"
                // onClick={() => {
                //   addMember(newName, newPnum, newJoindate);
                // }}
              />
            </>
          )}
          {newName != "" && newPnum != "" && newJoindate != "" && (
            <HiCheck
              className="button-member-check"
              onClick={() => {
                addMember(newName, newPnum, newJoindate);
              }}
            />
          )}

          <div className="div-member-section-01">
            {addPageOpen && addPage}
            <div className="div-member-updown-section">
              <div className="div-member-updown">
                <HiChevronUp
                  className={isColor == 0 && "icon-color"}
                  onClick={() => {
                    setIsColor(0);
                    getMember("name", "asc");
                  }}
                />
                <HiChevronDown
                  className={isColor == 1 && "icon-color"}
                  onClick={() => {
                    setIsColor(1);
                    getMember("name", "desc");
                  }}
                />
              </div>
              <div className="div-member-updown">
                <HiChevronUp
                  className={isColor == 2 && "icon-color"}
                  onClick={() => {
                    setIsColor(2);
                    getMember("join_date", "asc");
                  }}
                />
                <HiChevronDown
                  className={isColor == 3 && "icon-color"}
                  onClick={() => {
                    setIsColor(3);
                    getMember("join_date", "desc");
                  }}
                />
              </div>
            </div>
            {showMember}
          </div>
        </div>
      )}
    </>
  );
}

export default Member;
