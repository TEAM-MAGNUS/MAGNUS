function Connection(format, parameters, checkManager = false, isAlert = true) {
  const api = checkManager ? "apim" : "api";
  const api_host =
    window.location.protocol === "https:"
      ? "https://teammagnus.net/" + api
      : "http://localhost/" + api;

  const user_id = window.localStorage.getItem("id");
  const post = { ...parameters, user_id: user_id };
  const ret = fetch(api_host + format + "?user_id=" + user_id, {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  return ret;
}

export default Connection;
