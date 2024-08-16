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

export function showSelectedRow(selectElement, url) {
  let rows;

  if (url.includes("rows")) {
    rows = url
      .split("?")[1]
      .split("&")
      .filter((param) => param.includes("rows"))
      .toString()
      .split("=")[1];
  }

  for (let option of selectElement.children) {
    if (option.getAttribute("selected")) {
      option.setAttribute("selected", "false");
    }

    if (option.value === rows) {
      option.setAttribute("selected", "true");
    }
  }
}
