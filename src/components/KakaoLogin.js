import React, { useEffect } from 'react';
import { REST_API_KEY, REDIRECT_URI } from './LoginData';

function KaKaoLogin() {
    const PARAMS = new URL(document.location).searchParams; // URL에 있는 파라미터(code) 받아오기
    const KAKAO_CODE = PARAMS.get('code');
    
    const getKakaoToken = () => {
        fetch("https://kauth.kakao.com/oauth/token", {
            method: "post",
            headers: { "content-type": "application/x-www-form-urlencoded;charset=utf-8" },
            body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
    }

    const getUserInfo = (ACCESS_TOKEN) => {
        console.log(ACCESS_TOKEN);

        fetch("https://kapi.kakao.com/v2/user/me", {
            headers: { 
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            }
        })
            .then(res => res.json())
            // .then(data => saveKakaoUserInfo(data.id, data.kakao_account.profile.nickname))
    }

    function saveKakaoUserInfo(id, name) {
        const post = {
          query:
            "INSERT INTO magnus_user (id, name) VALUES (" +
            id + ", '" +
            name + "');"
        };
      
        console.log(post);
        fetch("https://hansori.net:443/SQL1", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(post),
        })
            .then(() => {
                console.log("success");
            })
      }
    
    useEffect(() => {
        getKakaoToken();
    }, []);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
            </div>
        </>
    );
}

export default KaKaoLogin;