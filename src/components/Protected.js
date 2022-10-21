import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import IsMe from "./IsMe";
import isLogin from "./Login";

const Protected = ({ element: Element, ...rest }) => {
  useEffect(() => {
    IsMe();
  }, []);
  if (isLogin()) {
    return <Element />;
  } else {
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/" />;
  }
};

export default Protected;
