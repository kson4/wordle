import { inputLetter, invalid, removeLetter, } from "./game-logic.js"
import { showSuggestions, showGraph } from "./suggestions.js"
import { wordList } from "./word-list.js"

// async function getWordleCall() {
//   const res = await fetch("https://random-word-api.herokuapp.com/word?length=5")
//   const data = await res.json()
//   document.querySelector(".container").style.visibility = "visible"
//   document.querySelector(".loader").style.visibility = "hidden"
//   return data
// }
// export const wordle = await getWordleCall()

export const wordle = [wordList[Math.floor(Math.random() * wordList.length)]]
// export const wordle = ["throe"]
document.querySelector(".container").style.visibility = "visible"
document.querySelector(".loader").style.visibility = "hidden"

console.log(wordle)

const tiles = document.querySelector(".tiles")
export const gameTiles = [
  ["[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]"],
  ["[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]"],
  ["[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]"],
  ["[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]"],
  ["[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]"],
  ["[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]", "[a-zA-Z]"]
]

showGraph(gameTiles[0], new Set(), [], [])

gameTiles.forEach((gameTile, idx) => {
  const row = document.createElement("div")
  row.setAttribute("id", `r${idx}`)
  gameTile.forEach((column, cIdx) => {
    const tile = document.createElement("div")
    tile.setAttribute("id", `r${idx}c${cIdx}`)
    tile.setAttribute("class", "tile")
    row.append(tile)
  })
  tiles.append(row)
})

document.addEventListener("keydown", (event) => {
  if (event.key >= "a" && event.key <= "z" || event.key == "Enter" || event.jey == "Backspace") {
    inputLetter(event.key)
  }
  if (event.key == "Backspace") {
    removeLetter()
  }
})

const keyboard = document.querySelector(".keyboard")
const keys = [
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", 
  "A", "S", "D", "F", "G","H","J","K","L", 
  "ENTER", "Z", "X", "C", "V", "B", "N", "M", "<<"
]
keys.forEach(key => {
  const button = document.createElement("button")
  button.textContent = key
  button.setAttribute("id", key)
  if (key == "<<") {
    button.addEventListener("click", removeLetter)
  }
  else if (key == "ENTER") {
    button.addEventListener("click", () => keyClicked("Enter"))
  }
  else {
    button.addEventListener("click", () => keyClicked(key.toLowerCase()))
  }
  
  keyboard.appendChild(button)
})

function keyClicked(key) {
  inputLetter(key)
}