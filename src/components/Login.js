import React, { useEffect } from "react";

// function isLogin() {
//   const id = window.sessionStorage.getItem("id");
//   var result;

//   if(id) {
//     const post = {
//       i: id
//     }

//     const result = fetch("https://teammagnus.net/searchUser", {
//       method: "post",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(post),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         return data.ISREGISTER;
//       })
//   }
//   return result;
// }

function isLogin() {
  if (window.sessionStorage.getItem("id")) return true;
  else return false;
}

export default isLogin;
