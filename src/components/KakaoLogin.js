import React from 'react';
import { REST_API_KEY, REDIRECT_URI } from './Login';

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
                
            });
    }

    return (
        <>
            KaKaoLogin
        </>
    );
}

export default KaKaoLogin;