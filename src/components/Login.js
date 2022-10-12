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
            <div
                style={{
                    width: "100vw",
                    height: "100vh",

                    postion: "relative",
                }}>
                <img
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                    src={loginbtn}
                    onClick={handleLogin}
                />
            </div>
        </>
    );
}

export default Login;