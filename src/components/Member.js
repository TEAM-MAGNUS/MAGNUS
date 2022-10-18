import React, { useEffect, useState } from "react";
import { HiChevronDown, HiChevronUp, HiOutlineArrowLeft } from "react-icons/hi";
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

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(false);

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
          <MemberAttendance name={name} />
        </>
      ) : (
        <div className="div-ranking">
          <div className="div-notice-header"></div>
          <NavLink to="/manage" className="link-header">
            <HiOutlineArrowLeft size="20" className="icon-back" />
          </NavLink>
          <div className="div-month">회원 관리</div>
          <div className="div-member-section-01">
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
