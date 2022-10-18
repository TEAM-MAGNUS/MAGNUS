import { React, useEffect, useState } from "react";
import { HiRefresh, HiOutlineArrowLeft } from "react-icons/hi";
import { NavLink } from "react-router-dom";

function Warning() {
  const [user, setUser] = useState([{}]);
  const [isGetting, setIsGetting] = useState(true);
  const getWarning = () => {
    fetch("https://teammagnus.net/getWarning", {
      method: "post",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
        setIsGetting(false);
      });
  };

  useEffect(() => {
    getWarning();
  }, []);

  const showWarning = user.map((user, idx) => (
    <div key={idx} className="div-warning-section-02">
      <div>{user.name}</div>
    </div>
  ));

  return (
    <div>
      <div className="div-attendance-section">
        <NavLink to="/manage" className="link-header">
          <HiOutlineArrowLeft size="20" className="icon-back" />
        </NavLink>
        <div className="div-month">경고자</div>
        <div className="div-warning-section-01">
          {!isGetting && user.length == 0 && "경고자가 없습니다."}
          {isGetting ? (
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
