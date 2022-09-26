import { gameTiles, wordle } from "./game-setup.js"
import { showSuggestions } from "./suggestions.js"

let currentRow = 0
let currentColumn = 0

export async function inputLetter(key) {
  if (key == "Enter") {
    if (currentColumn < 4 || gameTiles[currentRow][4] == "") {
      invalid()
    }
    else {
      if (currentColumn == 4 && await submitWord()) {
        checkWord()
        updateRowColumn(key)
      }
      else {
        errorMessage()
        invalid()
      }
    }
  }
  else if (key != "Backspace") {
    document.querySelector(`#r${currentRow}c${currentColumn}`).textContent = `${key}`
    gameTiles[currentRow][currentColumn] = key
    updateRowColumn(key)
    removeErrorMessage()
  }
}

async function submitWord() {
  const data = await isValidWord()
  if (data.title == "No Definitions Found") {
    return false
  }
  else {
    // console.log("WORD FOUND")
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
  if (currentColumn > 0) {
    if (document.querySelector(`#r${currentRow}c${currentColumn}`).textContent == "") {
      currentColumn -= 1
    }
    document.querySelector(`#r${currentRow}c${currentColumn}`).textContent = ""
    gameTiles[currentRow][currentColumn] = ""
  }
}

function checkWord() {
  const guess = gameTiles[currentRow].join("")
  const incorrectLetters = new Set()
  const correctLetters = new Set()
  let misplacedWords = []
  if (guess === wordle) {
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
        tile.classList.add("green")
      }
      // not a match -- add it into the map
      else {
        // console.log("CHECK: ", wordle[0], guess, i, wordle[0][i], guess[i])
        if (wordleCount.has(wordle[0][i])) {
          wordleCount.set(wordle[0][i], wordleCount.get(wordle[0][i]) + 1)
        }
        else {
          wordleCount.set(wordle[0][i], 1)
        }
        gameTiles[currentRow][i] = "[a-zA-z]"
      }
    }

    let misplacedWord = ["[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]"]
    for (let i = 0; i < 5; i++) {
      const tile = document.querySelector(`#r${currentRow}c${i}`)
      // match found -- not in right spot
      if (wordleCount.has(guess[i])) {
        wordleCount.set(guess[i], wordleCount.get(guess[i]) - 1)
        if (wordleCount.get(guess[i]) == 0) {
          wordleCount.delete(guess[i])
        }
        tile.classList.add("yellow")
        correctLetters.add(guess[i])
        
        // refactor this
        if (wordle[0][i] != guess[i]) {
          let copy = []
          for (let j = 0; j < i; j++) {
            copy.push("[a-zA-Z]")
          }
          copy.push(`[${guess[i]}]`)
          for (let j = i; j < 4; j++) {
            copy.push("[a-zA-Z]")
          }
          misplacedWords.push(copy)
        }
      }
      // not a match
      else {
        tile.classList.add("red")
        if (guess[i] != wordle[0][i]) {
          // gameTiles[currentRow][i] = "[a-zA-Z]"
          if (!wordle[0].includes(guess[i])) {
            incorrectLetters.add(guess[i])
          }
        }
        // console.log(incorrectLetters)
        // misplacedWord.push("[a-zA-Z]")
      }
    }

    updateRowColumn()
    showSuggestions(gameTiles[currentRow], incorrectLetters, correctLetters, misplacedWords)
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

function errorMessage() {
  const guess = gameTiles[currentRow].join("")
  document.querySelector(".word").textContent = guess;
  document.querySelector(".error").style.visibility = "visible"
}

function removeErrorMessage() {
  document.querySelector(".error").style.visibility = "hidden"
}