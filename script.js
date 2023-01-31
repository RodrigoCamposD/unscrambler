import { dicts } from "./words.js";

const btnCheck = document.querySelector(".btn-check");
const btnClr = document.querySelector(".btn-clr");
const inputWord = document.querySelector(".input-word");
const results = document.querySelector(".results");
const selector = document.querySelector(".dict-selector");

class App {
  #words;

  constructor() {
    btnClr.addEventListener("click", this.#init.bind(this));
    btnCheck.addEventListener("click", this.#checkWord.bind(this));
    window.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.#checkWord();
    });
    selector.addEventListener("change", (e) => {
      this.#words = dicts[e.target.value];
      results.innerHTML = "";
      if (inputWord.value !== "") this.#checkWord();
    });

    this.#prepareWords();
    this.#words = dicts[selector.value];
    this.#init();
  }

  #init() {
    results.innerHTML = "";
    inputWord.value = "";
    inputWord.select();
  }

  #prepareWords() {
    for (const dict in dicts) {
      const opt = document.createElement("option");
      opt.textContent = `${dict.slice(0, 2)}-${dict.slice(2)}`;
      opt.value = dict;
      opt.classList.add("option");
      selector.options.add(opt);
    }
  }

  #createDivAndAppend(divClass, divText, divId = 0) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(divClass);
    if (divId) newDiv.id = divId;
    results.appendChild(newDiv).textContent = divText;
  }

  #formatToChek(word) {
    return [...word.replace("-", "").toUpperCase()].sort().join("");
  }

  #checkWord() {
    const scrambled = inputWord.value.replace(/[^a-zA-Z]/g, "");
    inputWord.value = scrambled.toUpperCase();
    results.innerHTML = "";
    let resultsFound = 0;
    if (scrambled.length === 0) {
      this.#createDivAndAppend("not-valid", "Not valid word!");
      inputWord.select();
    } else {
      const testWord = this.#formatToChek(scrambled);
      this.#words.forEach((word) => {
        if (testWord === this.#formatToChek(word)) {
          resultsFound++;
          this.#createDivAndAppend("result", word, resultsFound);
        }
      });
      this.#createDivAndAppend("summary", `Results Found: ${resultsFound}`);
    }
  }
}

const app = new App();
