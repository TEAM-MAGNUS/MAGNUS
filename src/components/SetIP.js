import { React, useEffect, useState } from "react";
import { HiOutlineArrowLeft, HiPlus, HiMinus } from "react-icons/hi";
import { NavLink } from "react-router-dom";
function SetIP() {
  function getCurrentIP() {
    console.log("current!");
    fetch("https://teammagnus.net/getCurrentIP", {
      method: "post",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("current: " + json.ip);
        window.localStorage.setItem("currentIP", json.ip);
        window.location.reload();
      });
  }

  const [ip, setIP] = useState(window.localStorage.getItem("currentIP"));
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
      <HiMinus
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
          <HiOutlineArrowLeft size="20" className="icon-back" />
        </NavLink>
        <div className="div-month" style={{ marginBottom: "60px" }}>
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
            <HiPlus
              className="button-ip-minus"
              onClick={() => {
                if (ip != "") addIP();
              }}
              style={{
                backgroundColor: ip != "" ? "#e79b42" : "rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>
        <div
          className="button-ip-current"
          onClick={() => {
            getCurrentIP();
          }}
        >
          접속 IP 불러오기
        </div>
      </div>
    </div>
  );
}

export default SetIP;
