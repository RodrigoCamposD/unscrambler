"use strict";

/*
The idea of this simple project is to find a "real" word with a given 
other scrambled word, to do this I use the solution to turn the 
scrambled word into an array, then that is sorted, then turned back 
into a string by going through the dictionary looking for matches 
with the same done for list of words.
VE
https://arraythis.com/   to transform text list in array
https://kittxt.com/      tools like uppercase, trim, remove duplicates, etc

You can add your own dict, just update to object "dicts" in words.js
cons dicts = { language1: ["word1", "word2"], language2: ["word3", "word4"], };
No need to be upper case, just remember to use languages name like "enUS"
*/

let words;

const btnCheck = document.querySelector(".btn-check");
const btnClr = document.querySelector(".btn-clr");
const inputWord = document.querySelector(".input-word");
const results = document.querySelector(".results");
const selector = document.querySelector(".dict-selector");

// populating the options of dicts in html
for (const dict in dicts) {
  const opt = document.createElement("option");
  // tranforming the enUS to en-US
  opt.textContent = `${dict.slice(0, 2)}-${dict.slice(2)}`;
  opt.value = dict;
  selector.options.add(opt);
}

// selecting dict with selected value just created above
words = dicts[selector.value];

// reseting the results and input
const init = () => {
  results.innerHTML = "";
  inputWord.value = "";
  inputWord.select();
};

init();

// reusing to create and display results, summary and invalid word
const createDivAndAppend = (divClass, divText, divId = 0) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add(divClass);
  if (divId) newDiv.id = divId;
  results.appendChild(newDiv).textContent = divText;
};

// fomating to check strings
// string becomes array, then its ordened then back to string
// eye => EYE => ["E", "Y", "E"] => ["E", "E", "Y"] => EEY
const formatToChek = (word) =>
  [...word.replace("-", "").toUpperCase()].sort().join("");

const checkWord = () => {
  // removing everything thats not a letter
  const scrambled = inputWord.value.replace(/[^a-zA-Z]/g, "");
  // updating the input field to real word that will be checked
  // ") _ oLi V  888e" => OLIVE
  inputWord.value = scrambled.toUpperCase();
  results.innerHTML = ""; // clearing old results
  let resultsFound = 0;
  if (scrambled.length === 0) {
    createDivAndAppend("not-valid", "Not valid word!");
  } else {
    const testWord = formatToChek(scrambled);
    for (const word of words) {
      if (testWord === formatToChek(word)) {
        resultsFound++;
        createDivAndAppend("result", word, resultsFound);
      }
    }
    createDivAndAppend("summary", `Results Found: ${resultsFound}`);
  }
};

btnClr.addEventListener("click", init);
btnCheck.addEventListener("click", checkWord);
window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkWord();
});
// listening changes on selector
// then populating words array with new dict
selector.addEventListener("change", (e) => {
  words = dicts[e.target.value];
  results.innerHTML = "";
});
