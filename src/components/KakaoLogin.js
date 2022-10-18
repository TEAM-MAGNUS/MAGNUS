import React, { useState, useEffect, startTransition } from 'react';
import { REST_API_KEY, REDIRECT_URI } from './LoginData';

function KaKaoLogin() {
    const PARAMS = new URL(document.location).searchParams; // URL에 있는 파라미터(code) 받아오기
    const KAKAO_CODE = PARAMS.get('code');

    const getKakaoToken = async () => {
        fetch("https://kauth.kakao.com/oauth/token", {
            method: "post",
            headers: { "content-type": "application/x-www-form-urlencoded;charset=utf-8" },
            body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
        })
            .then(res => res.json())
            .then(data => {
                getUserInfo(data.access_token);
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
            .then(data => {
                console.log(data);
                window.sessionStorage.setItem("ID", data.id);
                window.sessionStorage.setItem("userName", data.kakao_account.profile.nickname);
                window.sessionStorage.setItem("imageUrl", data.kakao_account.profile.profile_image_url);
            })
            .catch(() => {
                window.sessionStorage.clear();
                window.location.href = "/";
            })
            .then(() => {searchUser(window.sessionStorage.getItem("ID"))});
    }

    function searchUser(id) {
        const post = {
            query:
                "SELECT EXISTS (SELECT id FROM test_user WHERE id = " +
                id + 
                ") AS ISLOGIN;"
        }

        console.log(post.query);
        fetch("https://hansori.net:443/SQL1", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(post)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                data.ISLOGIN ? window.location.replace("/") :
                saveKakaoUserInfo(window.sessionStorage.getItem("ID"), 
                window.sessionStorage.getItem("userName"));
            })
    }

    function saveKakaoUserInfo(id, name) {
        console.log("start");
        const post = {
          query:
            "INSERT INTO test_user (id, name) VALUES (" +
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
                alert("회원가입이 완료되었습니다.")
            })
            .then(() => {window.location.replace("/")});
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