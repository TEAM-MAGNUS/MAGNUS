import React, { useState, useEffect, startTransition } from "react";
import { BsCheck } from "react-icons/bs";

import { REST_API_KEY, REDIRECT_URI } from "./LoginData";
import profile from "./Profile";

function KaKaoLogin() {
  const PARAMS = new URL(document.location).searchParams; // URL에 있는 파라미터(code) 받아오기
  const KAKAO_CODE = PARAMS.get("code");

  const [Loading, setLoading] = useState(true);
  const [visible, setVisible] = useState("none");
  const [info, setInfo] = useState({
    id: "",
    name: "",
    imageUrl: "",
    pnum: "",
  });

  const onChange = (e) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      pnum: e.target.value,
    }));
    e.target.value.length === 11 ? setVisible("block") : setVisible("none");
  };

  const login = () => {
    window.sessionStorage.setItem("id", info.id);
    window.sessionStorage.setItem("name", info.name);
    window.sessionStorage.setItem("imageUrl", info.imageUrl);
    window.location.href = "/";
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
        window.sessionStorage.clear();
        window.location.href = "/";
      });
  };

  function searchUser(id) {
    const post = {
      query:
        "SELECT EXISTS (SELECT id FROM test_user WHERE id = " +
        id +
        ") AS ISREGISTER;",
    };

    console.log(post.query);
    fetch("https://hansori.net:443/SQL1", {
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
    console.log("start");
    const post = {
      query:
        "INSERT INTO test_user (id, name, pnum, image) VALUES ('" +
        id +
        "', '" +
        name +
        "', '" +
        pnum +
        "', '" +
        image +
        "');",
    };

    console.log(post.query);
    fetch("https://hansori.net:443/SQL1", {
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
  }

  useEffect(() => {
    getKakaoToken();
  }, []);
  useEffect(() => {
    console.log(info);
    info.id ? searchUser(info.id) : console.log("no id");
  }, [info.id]);

  return (
    <div className="div-kakaologin-body">
      {Loading ? (
        <div id="loading">
          <img id="loadingElement" src="loading.png" />
        </div>
      ) : (
        <div className="div-kakaologin-register-wrapper">
          <h2>환영합니다!</h2>
          <img src={info.imageUrl || profile} alt="" />
          {info.name}
          <div style={{ position: "relative" }}>
            <textarea
              placeholder="전화번호를 입력해주세요"
              maxLength="11"
              onChange={onChange}
            />
            <BsCheck
              style={{
                position: "absolute",
                right: "5px",
                bottom: "7px",
                width: "30px",
                height: "30px",
                display: visible,
              }}
              onClick={() => {
                saveKakaoUserInfo(info);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default KaKaoLogin;
