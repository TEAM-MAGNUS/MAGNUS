import { React, useState, useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import { HiChevronDown } from "react-icons/hi";

import { REST_API_KEY, REDIRECT_URI } from "./LoginData";
import isLogin from "./Login.js";

import logo from "../asset/main/logo.png";
import loginbtn from "../asset/login/kakao_login.png";

function Main() {
  const [login, setLogin] = useState(false);
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    console.log(isLogin());
  }, []);

  return (
    <>
      <ReactFullpage
        scrollOverflow={true}
        render={({ fullpageApi }) => (
          <div id="fullpage-wrapper">
            <div className="section">
              <div className="div-main-section-01">
                <img className="img-main" src={logo} alt="" />
                {!isLogin() && (
                  // {!login && (
                  <img
                    className="img-main"
                    style={{ marginTop: "50px" }}
                    src={loginbtn}
                    alt=""
                    onClick={handleLogin}
                  />
                )}
              </div>
              <HiChevronDown
                className="icon-main-arrow-down"
                size="20"
                onClick={() => fullpageApi.moveSectionDown()}
              />
            </div>
            <div className="section">
              <div className="div-main-section-01-01">
                금 20:00~21:30 <br />토 14:00~16:00 <br />일 16:00~18:00 <br />
                <br />
                충무로 러쉬클랜에서
                <br /> 훈련을 진행합니다.
              </div>
              <HiChevronDown
                className="icon-main-arrow-down"
                size="20"
                onClick={() => fullpageApi.moveSectionDown()}
              />
            </div>
            <div className="section">
              <div className="div-main-section-01-02">
                기존 부원 뿐만 아니라
                <br /> 신입부원들도 함께 운동을 하고 있습니다.
                <br />
                <br />
                금요일의 경우 블랙벨트 관장님이 훈련을 지도하시고 <br />
                토,일에는 코치진이 훈련을 진행하고 있습니다. <br />
                <br />
                추가로 주말에는 3층에 있는 헬스장을
                <br />
                무료로 마음껏 이용하실 수 있습니다.
                <br />
                <br />
                토요일, 일요일에는 훈련 후 <br />
                재미있는 뒷풀이가 종종 있습니다!
              </div>
              <HiChevronDown
                className="icon-main-arrow-down"
                size="20"
                onClick={() => fullpageApi.moveSectionDown()}
              />
            </div>
            <div className="section">
              <div className="div-main-section-01-03">
                마그누스 동아리원 혜택
              </div>
              <div className="div-main-section-01-02">
                <br />
                매 분기 주짓수 시합 출전비 반액 지원 <br />
                빠지, 스키장 등 함께 놀러가는 동아리 mt <br />
                주말 주짓수 이외에도 헬스장 무제한 사용가능 <br />
                다양한 학교 친구들과 교류할 수 있는 절호의 기회
              </div>
            </div>
          </div>
        )}
      />
    </>
  );
}

export default Main;
