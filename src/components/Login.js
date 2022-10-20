function isLogin() {
  if (window.sessionStorage.getItem("id")) return true;
  else return false;
}

export default isLogin;
