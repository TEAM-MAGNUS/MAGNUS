import Connection from "./Connection";

export default function IsMe() {
  Connection("/isMe", {
    id: window.localStorage.getItem("id"),
  })
    .then((res) => {
      if (!window.localStorage.getItem("name")) {
        window.localStorage.setItem("name", res.n);
        window.localStorage.setItem("pnum", res.p);
        window.location.reload();
      } else if (
        window.localStorage.getItem("name") != res.n ||
        window.localStorage.getItem("pnum") != res.p
      ) {
        window.localStorage.clear();
        window.location.href = "/";
      }
    })
    .catch((e) => {
      window.localStorage.clear();
      window.location.href = "/";
    });
}
