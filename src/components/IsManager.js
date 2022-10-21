export default function IsManager() {
  console.log("manager");
  const post = {
    id: window.sessionStorage.getItem("id"),
  };
  fetch("https://teammagnus.net/IsManager", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.m);
      if (json.m == 1) {
        if (window.sessionStorage.getItem("m") != 1) {
          window.sessionStorage.setItem("m", 1);
          window.location.reload();
        }
      } else {
        if (window.sessionStorage.getItem("m") == 1) {
          window.sessionStorage.setItem("m", 0);
          window.location.href = "/";
        }
        window.alert("접근 권한이 없습니다.");
        window.location.href = "/";
      }
    });
}
