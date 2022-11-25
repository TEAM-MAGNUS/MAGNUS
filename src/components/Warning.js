import { React, useEffect, useState } from "react";
import { HiX, HiRefresh, HiOutlineArrowLeft } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import MemberAttendance from "./MemberAttendance";

function Warning() {
  const td = new Date();

  const [user, setUser] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [name, setName] = useState("");
  const [pnum, setPnum] = useState("");
  const getWarning = () => {
    fetch("https://teammagnus.net/getWarningTest", {
      method: "post",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
      });
  };

  useEffect(() => {
    getWarning();
  }, []);

  const showWarning = user.map((user, idx) => (
    <div
      key={idx}
      className="div-joindate-section"
      onClick={() => {
        setIsDetailOpen(true);
        setName(user.n);
        setPnum(user.p);
      }}
      style={{ backgroundColor: user.i > 0 && "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="div-member-name">{user.n}</div>
      <div className="div-joindate-pnum">{user.p}</div>
    </div>
  ));

  return (
    <>
      {isDetailOpen ? (
        <>
          <MemberAttendance name={name} pnum={pnum} />
          <HiX
            size="20"
            className="icon-back"
            onClick={() => setIsDetailOpen(false)}
          />
        </>
      ) : (
        <div className="div-attendance-section">
          <div className="div-notice-header"></div>
          <NavLink to="/manage" className="link-header">
            <HiOutlineArrowLeft size="20" className="icon-back" />
          </NavLink>
          <div className="div-month">경고자</div>
          <div className="div-warning-section-01">
            {td.getDay() === 0 || td.getDay() === 5 || td.getDay() === 6 ? (
              <>
                <div className="div-warning-notday-01">
                  명단 업데이트 중입니다!
                </div>
                <div className="div-warning-notday-02">
                  (훈련일에는 경고자를 확인하실 수 없습니다.)
                </div>
              </>
            ) : user.length == 0 ? (
              <HiRefresh onClick={() => window.location.reload()} size="25" />
            ) : (
              showWarning
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Warning;
