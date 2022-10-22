import { React, useEffect, useState } from "react";
import { HiOutlineArrowLeft, HiCheck } from "react-icons/hi";
import { NavLink } from "react-router-dom";
function SetIP() {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };

  const changeIP = () => {
    const post = {
      ip: text,
    };

    fetch("https://teammagnus.net/changeIP", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.alert("변경 완료되었습니다.");
      window.location.href = "/manage";
    });
  };

  return (
    <div>
      <div className="div-attendance-section">
        <NavLink to="/manage" className="link-header">
          <HiOutlineArrowLeft size="20" className="icon-back" />
        </NavLink>
        <div className="div-month" style={{ marginBottom: "60px" }}>
          IP 변경
        </div>
        <div className="div-calendar-schedule-write">
          <input
            className="input-ip"
            maxLength={30}
            onChange={onChange}
            value={text}
          />
        </div>
        {text != "" && (
          <HiCheck
            className="button-calendar-schedule-write"
            style={{ backgroundColor: "#e79b42", marginTop: "20px" }}
            onClick={() => {
              if (window.confirm("출석 IP 주소를 변경하시겠습니까?")) {
                changeIP();
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default SetIP;
