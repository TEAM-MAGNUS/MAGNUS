export default function IsMe() {
  const post = {
    name: window.sessionStorage.getItem("name"),
    id: window.sessionStorage.getItem("id"),
  };
  fetch("https://teammagnus.net/isMe", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())

    .then((json) => {
      console.log("p: " + json.p);
      if (!window.sessionStorage.getItem("pnum")) {
        window.sessionStorage.setItem("pnum", json.p);
        window.location.reload();
      }
    })
    .catch((e) => {
      window.sessionStorage.clear();
      window.location.href = "/";
    });
}
