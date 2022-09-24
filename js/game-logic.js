import {gameTiles, wordle} from "./setup.js"

let currentRow = 0
let currentColumn = 0



export async function inputLetter(key) {
  console.log(currentColumn, key)
  if (key == "Enter") {
    // can only submit a 5 letter word
    if (currentColumn == 4) {
      // word is in dictionary
      if (await submitWord()) {
        checkWord()
        updateRowColumn(key)
      }
      else {
        invalid()
      }
    }
    else {
      invalid()
    }
  }
  else {
    document.querySelector(`#r${currentRow}c${currentColumn}`).textContent = key
    gameTiles[currentRow][currentColumn] = key
    updateRowColumn(key)
  }
}

async function submitWord() {
  console.log("ENTER")
  const data = await isValidWord()
  if (data.title == "No Definitions Found") {
    return false
  }
  else {
    console.log("WORD FOUND")
    return true
  }
}

async function isValidWord() {
  const guess = gameTiles[currentRow].join("")
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
  const data = await res.json()
  return data
}

export function removeLetter() {
  console.log(currentColumn)
  document.querySelector(`#r${currentRow}c${currentColumn}`).textContent = ""
  gameTiles[currentRow][currentColumn] = ""
  if (currentColumn != 0) {
    currentColumn -= 1
  }
  return currentColumn
}

function checkWord() {
  const guess = gameTiles[currentRow].join("")
  if (guess == wordle) {
    for (let i = 0; i < 5; i++) {
      document.querySelector(`#r${currentRow}c${i}`).classList.add("green")
    }
    winner()
  }
  else {
    const wordleCount = new Map()
    for (let i = 0; i < 5; i++) {
      // match found -- in right spot
      const tile = document.querySelector(`#r${currentRow}c${i}`)
      if (wordle[0][i] == guess[i]) {
        console.log("match!")
        tile.classList.add("green")
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
      const tile = document.querySelector(`#r${currentRow}c${i}`)
      // match found -- not in right spot
      if (wordleCount.has(guess[i])) {
        wordleCount.set(guess[i], wordleCount.get(guess[i]) - 1)
        if (wordleCount.get(guess[i]) == 0) {
          wordleCount.delete(guess[i])
        }
        tile.classList.add("yellow")
      }
      else {
        tile.classList.add("red")
      }
    }
    console.log(wordleCount)
    updateRowColumn()
  }
}

function updateRowColumn(key) {
  if (currentColumn < 4) {
    currentColumn += 1
  }
  else if (currentColumn == 4 && key == "Enter") {
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
    tile.classList.add("invalid-shake")
    setTimeout(() => {tile.classList.remove("invalid-shake")}, 250)
  }
}