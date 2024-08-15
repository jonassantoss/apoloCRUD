import "core-js/stable";
import "regenerator-runtime/runtime";
import { updateURLParameter, showSelectedRow } from "./utils.js";
import "./assets/output.css";

const select = document.querySelector("#row-select");
const firstPageButton = document.querySelector("#firstPageButton");
const previousPageButton = document.querySelector("#previousPageButton");
const nextPageButton = document.querySelector("#nextPageButton");
const lastPageButton = document.querySelector("#lastPageButton");

const currentURL = window.location.href;

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

select.addEventListener("change", () => {
  const rowsValue = select.value;
  console.log(rowsValue);
  changeTableRows(rowsValue);
});

function goToPage(page) {
  const newURL = updateURLParameter(currentURL, "page", page);
  window.location.href = newURL;
}

function changeTableRows(rowsValue) {
  const newURL = updateURLParameter(currentURL, "rows", rowsValue);
  window.location.href = newURL;
}

showSelectedRow(select, currentURL);
