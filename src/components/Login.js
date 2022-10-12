import React from "react";
import loginbtn from "../asset/login/kakao_login.png";

export const REST_API_KEY = '08066204288ab5d47ffcf2d53a17bdad';
export const REDIRECT_URI = 'http://localhost:3000/kakaologin';

function Login() {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const handleLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    }

    return (
        <>
            <img 
                src={loginbtn} 
                onClick={handleLogin}
            />
        </>
    );
}

export default Login;