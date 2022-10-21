export default function IsMe() {
  const post = {
    id: window.sessionStorage.getItem("id"),
  };
  fetch("https://teammagnus.net/isMe", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (!window.sessionStorage.getItem("name")) {
        window.sessionStorage.setItem("name", json.n);
        window.sessionStorage.setItem("pnum", json.p);
        window.location.reload();
      } else if (
        window.sessionStorage.getItem("name") != json.n ||
        window.sessionStorage.getItem("pnum") != json.p
      ) {
        console.log("ssssss");
        window.sessionStorage.clear();
        window.location.href = "/";
      }
    })
    .catch((e) => {
      window.sessionStorage.clear();
      window.location.href = "/";
    });
}
