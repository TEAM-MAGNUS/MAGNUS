import React, { useState, useEffect } from "react";
import { HiCheck } from "react-icons/hi";

import { REST_API_KEY, REDIRECT_URI } from "./LoginData";
import profile from "./Profile";
import ReactSquircle from "react-squircle";

function KaKaoLogin() {
  const PARAMS = new URL(document.location).searchParams; // URL에 있는 파라미터(code) 받아오기
  const KAKAO_CODE = PARAMS.get("code");

  const [Loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [smsClick, setSmsClick] = useState(false);
  const [sms, setSms] = useState("");
  const [info, setInfo] = useState({
    id: "",
    name: "",
    imageUrl: "",
    pnum: "",
  });

  const [verified, setVerified] = useState(false);

  console.log(info.name);
  const onChange = (e) => {
    switch (e.target.name) {
      case "name":
        setInfo((prevInfo) => ({
          ...prevInfo,
          name: e.target.value,
        }));

        break;
      case "pnum":
        setInfo((prevInfo) => ({
          ...prevInfo,
          pnum: e.target.value,
        }));
        e.target.value.length === 11 ? setVisible(true) : setVisible(false);
        break;
      case "sms":
        setSms(e.target.value);
        break;
      default:
    }
  };

  const smsAuth = () => {
    console.log("sms!");
    const post = {
      p: info.pnum,
    };

    fetch("https://teammagnus.net/smsAuth", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.result) {
          window.alert("인증번호가 발송되었습니다.");
          setSmsClick(true);
        } else {
          window.alert("등록된 회원이 아닙니다.");
        }
      });
  };

  const codeCheck = () => {
    const post = {
      code: sms,
    };

    fetch("https://teammagnus.net/codeCheck", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.result) {
          setVerified(true);
        } else {
          window.alert("인증번호를 다시 확인해주세요.");
        }
      });
  };

  const login = () => {
    const post = {
      img: info.imageUrl,
      id: info.id,
    };

    console.log(post.query);
    fetch("https://teammagnus.net/login", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(console.log("img update success"));

    window.localStorage.setItem("id", info.id);
    window.localStorage.setItem("imageUrl", info.imageUrl);
    window.location.href = "/profile";
  };

  const getKakaoToken = () => {
    fetch("https://kauth.kakao.com/oauth/token", {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    })
      .then((res) => res.json())
      .then((data) => {
        getUserInfo(data.access_token);
      });
  };

  const getUserInfo = (ACCESS_TOKEN) => {
    console.log(ACCESS_TOKEN);

    fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setInfo({
          id: data.id,
          name: data.kakao_account.profile.nickname,
          imageUrl: data.kakao_account.profile.thumbnail_image_url,
        });
        console.log(data);
      })
      .catch(() => {
        window.localStorage.clear();
        window.location.href = "/";
      });
  };

  function searchUser(id) {
    const post = {
      id: id,
    };

    fetch("https://teammagnus.net/searchUser", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.ISREGISTER ? login() : setLoading(false);
      });
  }

  function saveKakaoUserInfo({ id, name, pnum, imageUrl: image }) {
    const p =
      pnum.substr(0, 3) + "-" + pnum.substr(3, 4) + "-" + pnum.substr(7, 4);
    const post1 = {
      p: p,
    };
    fetch("https://teammagnus.net/isMember", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post1),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.ISMEMBER) {
          const post = {
            i: id,
            p: p,
            img: image,
          };

          fetch("https://teammagnus.net/saveKakaoUserInfo", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(post),
          })
            .then(() => {
              alert("회원가입이 완료되었습니다.");
            })
            .then(() => {
              login();
            });
        } else {
          alert("등록된 회원이 아닙니다.");
          window.location.href = "/";
        }
      });
  }

  useEffect(() => {
    getKakaoToken();
  }, []);
  useEffect(() => {
    console.log(info);
    info.id ? searchUser(info.id) : console.log("no id");
  }, [info.id]);

  console.log("v: " + verified);
  return (
    <div className="div-kakaologin-body">
      {Loading ? (
        <div id="loading">
          <img id="loadingElement" src="loading.png" />
        </div>
      ) : (
        <div className="div-kakaologin-register-wrapper">
          <ReactSquircle
            width="80px"
            height="80px"
            fit=""
            className="squircle"
            imageUrl={info.imageUrl || profile}
          />
          <div className="div-login-input-pnum">
            휴대전화번호를 입력해주세요.
            <input
              maxLength="11"
              onChange={onChange}
              name="pnum"
              value={info.pnum}
              disabled={smsClick}
            />
            {visible && (
              <>
                <HiCheck className="icon-login-check" />
              </>
            )}
            {visible && !smsClick && (
              <div className="div-login-input-pnum">
                <div
                  className="button-login-sms "
                  onClick={() => {
                    if (!smsClick) {
                      smsAuth();
                    }
                  }}
                >
                  인증번호 받기
                </div>
              </div>
            )}
          </div>

          {smsClick && (
            <>
              <div className="div-login-input-pnum">
                인증번호를 입력해주세요.
                <input
                  maxLength="6"
                  onChange={onChange}
                  name="sms"
                  value={sms}
                  disabled={verified}
                />
                {verified && (
                  <>
                    <HiCheck className="icon-login-check" />
                  </>
                )}
              </div>
              {sms.length == 6 && !verified && (
                <div className="div-login-input-pnum">
                  <div
                    className="button-login-sms "
                    onClick={() => {
                      codeCheck();
                    }}
                  >
                    인증 완료하기
                  </div>
                </div>
              )}
            </>
          )}
          {verified && (
            <div className="div-login-input-pnum">
              <div
                className="button-login-sms "
                onClick={() => {
                  if (window.confirm("회원가입을 진행하시겠습니까?"))
                    saveKakaoUserInfo(info);
                }}
              >
                회원가입
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default KaKaoLogin;
