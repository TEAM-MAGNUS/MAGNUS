import { React, useEffect, useState } from "react";

function Warning() {
  const [user, setUser] = useState([{}]);

  const getWarning = () => {
    fetch("https://localhost/getWarning", {
      // fetch("https://teammagnus.net/getWarning", {
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
    <div key={idx} className="div-warning-section-02">
      <div>{user.name}</div>
    </div>
  ));
  return (
    <div>
      <div className="div-attendance-section">
        <div className="div-month">경고자</div>
        <div className="div-warning-section-01"> {showWarning}</div>
      </div>
    </div>
  );
}

export default Warning;
