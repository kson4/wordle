import {gameTiles, wordle} from "./setup.js"

let currentRow = 0
let currentColumn = 0

export function inputLetter(key) {
  document.querySelector(`#r${currentRow}c${currentColumn}`).textContent = key
  gameTiles[currentRow][currentColumn] = key

  updateRowColumn()
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
  if (currentColumn == 5) {
    const guess = gameTiles[currentRow].join("")
    if (guess == wordle) {
      winner()
    }
    else {
      const wordleCount = new Map()
      for (let i = 0; i < 5; i++) {
        // match found -- in right spot
        if (wordle[0][i] == guess[i]) {
          console.log("match!")
        }
        // not a match -- add it into the map
        else if (wordle[0][i] != guess[i]) {
          if (wordleCount.has(wordle[0][i])) {
            wordleCount.set(wordle[0][i], wordleCount.get(wordle[0][i]) + 1)
          }
          else {
            wordleCount.set(wordle[0][i], 1)
          }
        }
      }

      for (let i = 0; i < 5; i++) {
        // match found -- not in right spot
        if (wordleCount.has(guess[i])) {
          wordleCount.set(guess[i], wordleCount.get(guess[i]) - 1)
          if (wordleCount.get(guess[i]) == 0) {
            wordleCount.delete(guess[i])
          }
        }
      }
      console.log(wordleCount)
      updateRowColumn()
    }
  }
}

function updateRowColumn() {
  // console.log(currentRow + " " + currentColumn)
  if (currentColumn < 5) {
    currentColumn += 1
  }
  else {
    currentRow += 1
    currentColumn = 0
  }

  if (currentRow == 6) {
    console.log("GAME OVER")
  }
}

function winner() {
  console.log("WINNER!")
}

export function invalid() {

  for (let i = 0; i < 5; i++) {
    const tile = document.querySelector(`#r${currentRow}c` + i)
    tile.setAttribute("class", "invalid-shake")
    setTimeout(() => {tile.classList.remove("invalid-shake")}, 250)
    console.log(tile)
  }

  setTimeout(() => {

  })
}