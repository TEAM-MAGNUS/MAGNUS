import React from "react";
import { Navigate } from "react-router-dom";

const NotFound = () => {
  alert("페이지가 존재하지 않습니다.");
  return <Navigate to="/" />;
};

export default NotFound;
