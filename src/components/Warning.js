import { React, useEffect, useState } from "react";
import { HiRefresh, HiOutlineArrowLeft } from "react-icons/hi";
import { NavLink } from "react-router-dom";

function Warning() {
  const td = new Date();

  const [user, setUser] = useState([{}]);
  const getWarning = () => {
    fetch("https://teammagnus.net/getWarning", {
      method: "post",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUser(json);
      });
  };

  useEffect(() => {
    getWarning();
  }, []);

  const showWarning = user.map((user, idx) => (
    <div key={idx} className="div-warning-section-02">
      <div>{user.n}</div>
      <div>{user.p}</div>
    </div>
  ));

  return (
    <div>
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
    </div>
  );
}

export default Warning;
