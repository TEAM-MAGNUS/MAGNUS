export default function IsMe() {
  const post = {
    id: window.localStorage.getItem("id"),
  };
  fetch("https://teammagnus.net/isMe", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (!window.localStorage.getItem("name")) {
        window.localStorage.setItem("name", json.n);
        window.localStorage.setItem("pnum", json.p);
        window.location.reload();
      } else if (
        window.localStorage.getItem("name") != json.n ||
        window.localStorage.getItem("pnum") != json.p
      ) {
        console.log("ssssss");
        window.localStorage.clear();
        window.location.href = "/";
      }
    })
    .catch((e) => {
      window.localStorage.clear();
      window.location.href = "/";
    });
}
