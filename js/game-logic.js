import {gameTiles} from "./setup.js"

let currentRow = 0
let currentColumn = 0

export function inputLetter(key) {
  document.querySelector(`#r${currentRow}c${currentColumn}`).textContent = key
  gameTiles[currentRow][currentColumn] = key
  currentColumn += 1

  checkWord()
}

export function removeLetter() {
  if (currentColumn > 0) {
    currentColumn -= 1
    document.querySelector(`#r${currentRow}c${currentColumn}`).textContent = ""
    gameTiles[currentRow][currentColumn] = ""
  }
}

function checkWord() {
  if (currentColumn === 5) {
    const guess = gameTiles[currentRow].join("")
    console.log(guess)
  }
}