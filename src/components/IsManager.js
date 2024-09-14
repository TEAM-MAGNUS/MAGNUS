import Connection from "./Connection";

export default function IsManager() {
  Connection("/IsManager", {
    id: window.localStorage.getItem("id"),
  }).then((res) => {
    if (res.m == 1) {
      if (window.localStorage.getItem("m") != 1) {
        window.localStorage.setItem("m", 1);
        window.location.reload();
      }
    } else {
      if (window.localStorage.getItem("m") == 1) {
        window.localStorage.setItem("m", 0);
        window.location.href = "/";
      }
      window.alert("접근 권한이 없습니다.");
      window.location.href = "/";
    }
  });
}
