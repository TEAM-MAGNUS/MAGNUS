import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import IsManager from "./IsManager";
import IsMe from "./IsMe";
import isLogin from "./Login";

const ProtectedM = ({ element: Element, ...rest }) => {
  useEffect(() => {
    IsMe();
    IsManager();
  }, []);
  if (isLogin()) {
    return <Element />;
  } else {
    alert("접근 권한이 없습니다.");
    return <Navigate to="/" />;
  }
};

export default ProtectedM;
