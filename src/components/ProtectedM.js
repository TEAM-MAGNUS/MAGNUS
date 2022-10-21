import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import IsManager from "./IsManager";
import IsMe from "./IsMe";
import isLogin from "./Login";

const ProtectedM = ({ element: Element, ...rest }) => {
  useEffect(() => {
    IsManager();
  }, []);
  if (isLogin()) {
    return <Element />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedM;
