function isLogin() {
    if (window.sessionStorage.getItem("ID")) return true;
    else return false;
}

export default isLogin;