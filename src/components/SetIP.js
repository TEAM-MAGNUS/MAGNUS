import { React, useEffect, useState } from "react";
import { BiLeftArrowAlt, BiPlus, BiMinus } from "react-icons/bi";
import { NavLink } from "react-router-dom";
function SetIP() {
  const [currentIP, setCurrentIP] = useState("currentIP");
  function getCurrentIP() {
    console.log("current!");
    fetch("https://teammagnus.net/getCurrentIP", {
      method: "post",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setIP(json.ip);
        setCurrentIP(json.ip);
        console.log("current: " + json.ip);
      });
  }

  const [ip, setIP] = useState("");
  const onChange = (e) => {
    setIP(e.target.value);
  };

  const addIP = () => {
    const post = {
      ip: ip,
    };

    fetch("https://teammagnus.net/addIP", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.alert("추가 완료되었습니다.");
      window.location.reload();
    });
  };

  const [ipList, setIpList] = useState([]);

  const getIP = () => {
    fetch("https://teammagnus.net/getIP", {
      method: "post",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setIpList(json);
      });
  };
  console.log(ipList);
  const removeIP = (ip) => {
    const post = {
      ip: ip,
    };
    fetch("https://teammagnus.net/removeIP", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    getIP();
  }, []);
  const showIP = ipList.map((i, idx) => (
    <div key={idx} className="div-ip-section-02">
      {i.ip}
      <BiMinus
        className="button-ip-minus"
        onClick={() => {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            removeIP(i.ip);
          }
        }}
      />
    </div>
  ));

  return (
    <div>
      <div className="div-attendance-section">
        <NavLink to="/manage" className="link-header">
          <BiLeftArrowAlt size="20" className="icon-back" />
        </NavLink>
        <div className="div-month-title" style={{ marginBottom: "60px" }}>
          IP 변경
        </div>
        {showIP}
        <div className="div-ip-section-02">
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              className="input-ip-write-date"
              onChange={onChange}
              name="ip"
              value={ip}
              placeholder={"IP를 입력해주세요."}
            />
            <BiPlus
              className="button-ip-minus"
              onClick={() => {
                if (ip != "") addIP();
              }}
              style={{
                backgroundColor: ip != "" ? "#e79b42" : "rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
        </div>
        {currentIP != ip && (
          <div
            className="button-ip-current"
            onClick={() => {
              getCurrentIP();
            }}
          >
            접속 IP 불러오기
          </div>
        )}
      </div>
    </div>
  );
}

export default SetIP;
