import { inputLetter, invalid, removeLetter, } from "./game-logic.js"

async function getWordleCall() {
  const res = await fetch("https://random-word-api.herokuapp.com/word?length=5")
  const data = await res.json()
  return data
}

export const wordle = await getWordleCall()
console.log(wordle)

const tiles = document.querySelector(".tiles")
export const gameTiles = [
  ["a", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""]
]

gameTiles.forEach((gameTile, idx) => {
  const row = document.createElement("div")
  row.setAttribute("id", `r${idx}`)
  gameTile.forEach((column, cIdx) => {
    const tile = document.createElement("div")
    tile.setAttribute("id", `r${idx}c${cIdx}`)
    row.append(tile)
  })
  tiles.append(row)
})

invalid()

document.addEventListener("keydown", (event) => {
  if (event.key >= "a" && event.key <= "z") {
    inputLetter(event.key)
  }
  if (event.key === "Backspace") {
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
  if (key === "<<") {
    button.addEventListener("click", removeLetter)
  }
  else {
    button.addEventListener("click", () => keyClicked(key.toLowerCase()))
  }
  
  keyboard.appendChild(button)
})

function keyClicked(key) {
  console.log("clicked", key)
  inputLetter(key)
}