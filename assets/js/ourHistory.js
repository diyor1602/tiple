let historyStart = document.querySelector(".historyStart");
let historyDiff = document.querySelector(".historyDiff");
let historyCurrent = document.querySelector(".historyCurrent");
let spanDiff = document.querySelector(".ourHistoryTexts__title__year");

let currentYear = new Date().getFullYear();
let startYear = 2005;

historyStart.innerHTML = startYear;
historyDiff.innerHTML = `${currentYear - startYear} years`;
spanDiff.innerHTML = `${currentYear - startYear}`;
historyCurrent.innerHTML = currentYear;
