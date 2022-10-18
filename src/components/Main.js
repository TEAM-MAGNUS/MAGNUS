import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import { HiChevronDown } from "react-icons/hi";

import { REST_API_KEY, REDIRECT_URI } from "./LoginData";
import isLogin from "./Login.js"

import logo from "../asset/main/logo.png";
import loginbtn from "../asset/login/kakao_login.png";

function Main() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  }
  const handleLogout = () => {
    window.sessionStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <ReactFullpage
        scrollOverflow={true}
        render={({ fullpageApi }) => (
          <div id="fullpage-wrapper">
            <div className="section">
              <div className="div-main-section-01">
                <img className="img-main" src={logo} alt="" />
                {isLogin() ?
                  <div
                    className="img-main"
                    style={{
                      backgroundColor: "white",
                      marginTop: "20px",
                      height: "30px",
                      textAlign: "center",
                    }}
                    onClick={handleLogout}
                  >
                    로그아웃
                  </div>
                  :
                  <img 
                  className="img-main" 
                  style={{ marginTop: "30px" }}
                  src={loginbtn} 
                  alt=""
                  onClick={handleLogin}
                  />
                }
              </div>
              <HiChevronDown
                className="icon-main-arrow-down"
                size="20"
                onClick={() => fullpageApi.moveSectionDown()}
              />
            </div>
            <div className="section">
              <div className="div-main-section-01">홍보페이지1</div>
              <HiChevronDown
                className="icon-main-arrow-down"
                size="20"
                onClick={() => fullpageApi.moveSectionDown()}
              />
            </div>
            <div className="section">
              <div className="div-main-section-01">홍보페이지2</div>
            </div>
          </div>
        )}
      />
    </>
  );
}

export default Main;
