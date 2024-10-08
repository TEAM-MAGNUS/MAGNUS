import React, { useState, useEffect } from "react";
import { BiCheck } from "react-icons/bi";

import { REST_API_KEY, REDIRECT_URI } from "./LoginData";
import profile from "./Profile";
import SuperEllipse from "react-superellipse";

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
    const post = {
      p: info.pnum,
    };

    fetch("https://teammagnus.net/api2/smsAuth", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.result) {
          window.alert("인증번호가 발송되었습니다.");
        } else {
          setSmsClick(false);
          window.alert("등록된 회원이 아닙니다.");
        }
      });
  };

  const codeCheck = () => {
    window.alert("번호인증이 완료되었습니다.");
    setVerified(true);

    // const post = {
    //   code: sms,
    //   p: info.pnum,
    // };

    // fetch("https://teammagnus.net/api2/codeCheck", {
    //   method: "post",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify(post),
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     if (json.result) {
    //       window.alert("번호인증이 완료되었습니다.");
    //       setVerified(true);
    //     } else {
    //       window.alert("인증번호를 다시 확인해주세요.");
    //     }
    //   });
  };

  const login = () => {
    const post = {
      img: info.imageUrl,
      id: info.id,
    };

    fetch("https://teammagnus.net/api2/login", {
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
    // console.log(ACCESS_TOKEN);

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
          imageUrl:
            "https" + data.kakao_account.profile.thumbnail_image_url.substr(4),
        });
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

    fetch("https://teammagnus.net/api2/searchUser", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((data) => {
        data.ISREGISTER ? login() : setLoading(false);
      });
  }

  function saveKakaoUserInfo({ id, name, pnum, imageUrl: image }) {
    const p =
      pnum.substr(0, 3) + "-" + pnum.substr(3, 4) + "-" + pnum.substr(7, 4);
    const post1 = {
      p: p,
    };
    fetch("https://teammagnus.net/api2/isMember", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post1),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.ISMEMBER) {
          const post = {
            i: id,
            p: p,
            img: image,
          };

          fetch("https://teammagnus.net/api2/saveKakaoUserInfo", {
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
    info.id ? searchUser(info.id) : console.log("no id");
  }, [info.id]);

  // console.log("v: " + verified);
  return (
    <div className="div-kakaologin-body">
      {Loading ? (
        <div id="loading">
          <img id="loadingElement" src="loading.png" alt="" />
        </div>
      ) : (
        <div className="div-kakaologin-register-wrapper">
          <SuperEllipse className="squircle-profile" r1={0.14} r2={0.5}>
            <img
              className="img-profile-squircle"
              src={info.imageUrl || profile}
              alt=""
            />
          </SuperEllipse>
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
                <BiCheck className="icon-login-check" />
              </>
            )}
            {visible && !smsClick && (
              <div className="div-login-input-pnum">
                {/* <div
                  className="button-login-sms "
                  onClick={() => {
                    if (!smsClick) {
                      setSmsClick(true);
                      smsAuth();
                    }
                  }}
                >
                  인증번호 받기
                </div> */}
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

          {/* {smsClick && (
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
                    <BiCheck className="icon-login-check" />
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
          )} */}
          {/* {verified && (
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
          )} */}
        </div>
      )}
    </div>
  );
}

export default KaKaoLogin;
