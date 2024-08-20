export function updateURLParameter(url, param, paramValue) {
  let newAdditionalURL = "";
  let [path, params] = url.split("?");
  let temp = "";

  if (params) {
    params = params.split("&");

    for (let i = 0; i < params.length; i++) {
      if (params[i].split("=")[0] !== param) {
        newAdditionalURL += temp + params[i];
        temp = "&";
      }
    }
  }

  let pageParam = temp + param + "=" + paramValue;
  return path + "?" + newAdditionalURL + pageParam;
}
