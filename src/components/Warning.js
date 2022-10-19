import { React, useEffect, useState } from "react";
import { HiRefresh, HiOutlineArrowLeft } from "react-icons/hi";
import { NavLink } from "react-router-dom";

function Warning() {
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
      <div>{user.name}</div>
      <div>{user.pnum}</div>
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
          {user.length == 0 ? (
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
