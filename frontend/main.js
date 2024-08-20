import "core-js/stable";
import "regenerator-runtime/runtime";
import { updateURLParameter } from "./utils.js";
import "./assets/output.css";

const select = document.querySelector("#row-select");
const form = document.querySelector("#search-form");
const exportTableButton = document.querySelector("#exportTableButton");
const firstPageButton = document.querySelector("#firstPageButton");
const previousPageButton = document.querySelector("#previousPageButton");
const nextPageButton = document.querySelector("#nextPageButton");
const lastPageButton = document.querySelector("#lastPageButton");

let currentURL = window.location.href;

select.addEventListener("change", () => {
  const rowsValue = select.value;
  changeTableRows(rowsValue);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchValue = form["search"].value;
  currentURL = updateURLParameter(currentURL, "search", searchValue);
  window.location.href = currentURL;
});

firstPageButton?.addEventListener("click", () => {
  const toPage = parseInt(firstPageButton.getAttribute("data-to-page"));
  goToPage(toPage);
});

previousPageButton?.addEventListener("click", () => {
  const toPage = parseInt(previousPageButton.getAttribute("data-to-page"));
  goToPage(toPage);
});

nextPageButton?.addEventListener("click", () => {
  const toPage = parseInt(nextPageButton.getAttribute("data-to-page"));
  goToPage(toPage);
});

lastPageButton?.addEventListener("click", () => {
  const toPage = parseInt(lastPageButton.getAttribute("data-to-page"));
  goToPage(toPage);
});

function goToPage(page) {
  currentURL = updateURLParameter(currentURL, "page", page);
  window.location.href = currentURL;
}

function changeTableRows(rowsValue) {
  currentURL = updateURLParameter(currentURL, "rows", rowsValue);
  window.location.href = currentURL;
}
